export type ReceiptType = 'purchase' | 'sale'

export interface ReceiptItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Receipt {
  id: string
  clientId: string
  type: ReceiptType
  date: string
  vendorName: string
  vendorTIN: string
  ebmSerial: string
  invoiceNumber: string
  items: ReceiptItem[]
  subtotal: number
  vatAmount: number
  grandTotal: number
  imageUrl: string
  createdAt: string
}

export interface Client {
  id: string
  name: string
  tin: string
  email: string
  createdAt: string
}

export interface LedgerSummary {
  totalSales: number
  totalPurchases: number
  grossProfit: number
  vatCollected: number
  vatPaid: number
  netVATOwed: number
}