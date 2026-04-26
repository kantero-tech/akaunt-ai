import { useState } from 'react'
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  RadioGroup,
  Radio,
  Stack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import type { Receipt, ReceiptType } from '../types'
import { extractReceiptData, fileToBase64 } from '../services/openrouterService'

interface Props {
  onExtracted: (data: Partial<Receipt>) => void
}

function ReceiptUploader({ onExtracted }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [type, setType] = useState<ReceiptType>('purchase')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    onDrop: async (files) => {
      const file = files[0]
      if (!file) return
      const base64 = await fileToBase64(file)
      setPreview(base64)
    },
  })

  const handleExtract = async () => {
    if (!preview) return
    setLoading(true)
    try {
      const data = await extractReceiptData(preview, type)
      onExtracted(data)
      toast({
        title: 'Receipt extracted!',
        description: 'Review the data on the next screen.',
        status: 'success',
        duration: 3000,
      })
      setPreview(null)
    } catch (err) {
      toast({
        title: 'Extraction failed',
        description: (err as Error).message,
        status: 'error',
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="700px" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={2} color="teal.600">
            Upload EBM Receipt
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Drop a clear photo or screenshot of your EBM receipt
          </Text>
        </Box>

        <Box>
          <Text fontWeight="medium" mb={2}>
            Receipt Type
          </Text>
          <RadioGroup value={type} onChange={(v) => setType(v as ReceiptType)}>
            <Stack direction="row" spacing={5}>
              <Radio value="purchase">Purchase (you paid)</Radio>
              <Radio value="sale">Sale (you received)</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {!preview ? (
          <Box
            {...getRootProps()}
            border="2px dashed"
            borderColor={isDragActive ? 'teal.500' : 'gray.300'}
            borderRadius="lg"
            p={10}
            textAlign="center"
            cursor="pointer"
            bg={isDragActive ? 'teal.50' : 'gray.50'}
            transition="all 0.2s"
            _hover={{ borderColor: 'teal.500', bg: 'teal.50' }}
          >
            <input {...getInputProps()} />
            <VStack spacing={2}>
              <Text fontSize="3xl">📷</Text>
              <Text fontWeight="medium">
                {isDragActive ? 'Drop the receipt here' : 'Drop a receipt here, or click to select'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                PNG, JPG, JPEG, or WEBP
              </Text>
            </VStack>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            <Box border="1px solid" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <Image src={preview} alt="Receipt preview" maxH="400px" mx="auto" />
            </Box>

            <Alert status="info" borderRadius="md">
              <AlertIcon />
              Marked as:
              <Text as="span" fontWeight="bold" ml={2}>
                {type === 'purchase' ? 'Purchase' : 'Sale'}
              </Text>
            </Alert>

            <HStack spacing={3}>
              <Button
                variant="outline"
                onClick={() => setPreview(null)}
                isDisabled={loading}
                flex={1}
              >
                Choose Different Photo
              </Button>
              <Button
                colorScheme="teal"
                onClick={handleExtract}
                isLoading={loading}
                loadingText="Extracting..."
                leftIcon={loading ? <Spinner size="sm" /> : undefined}
                flex={2}
              >
                Extract with AI
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Box>
  )
}

export default ReceiptUploader