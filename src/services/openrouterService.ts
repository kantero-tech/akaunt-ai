import axios from 'axios'
import type { Receipt, ReceiptType } from '../types'

const API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

const SYSTEM_PROMPT = `You are an EBM (Electronic Billing Machine) receipt extraction expert for Rwanda Revenue Authority (RRA) compliance.

Analyze the receipt image and extract the data into VALID JSON ONLY.

Return ONLY this JSON structure (no prose, no markdown, no explanation):

{
  "date": "YYYY-MM-DD",
  "vendorName": "string",
  "vendorTIN": "string or empty",
  "ebmSerial": "string or empty",
  "invoiceNumber": "string or empty",
  "items": [
    {
      "description": "string",
      "quantity": number,
      "unitPrice": number,
      "total": number
    }
  ],
  "subtotal": number,
  "vatAmount": number,
  "grandTotal": number
}

Rules:
- All amounts are in Rwandan Francs (RWF) - numbers only, no currency symbols
- VAT in Rwanda is 18%
- If a field is unreadable, use empty string for text or 0 for numbers
- Return ONLY the JSON, nothing else`

export async function extractReceiptData(
  base64Image: string,
  type: ReceiptType
): Promise<Partial<Receipt>> {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Extract the data from this ${type} receipt.`,
              },
              {
                type: 'image_url',
                image_url: { url: base64Image },
              },
            ],
          },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'AkauntAI',
        },
      }
    )

    const content = response.data.choices[0].message.content
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return {
      ...parsed,
      type,
      imageUrl: base64Image,
    }
  } catch (error) {
    console.error('AI extraction error:', error)
    throw new Error('Failed to extract receipt data. Please try again.')
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}