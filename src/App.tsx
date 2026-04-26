import { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Badge,
  Container,
  Code,
} from '@chakra-ui/react'
import ReceiptUploader from './components/ReceiptUploader'
import type { Receipt } from './types'

function App() {
  const [extractedData, setExtractedData] = useState<Partial<Receipt> | null>(null)

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="teal.600" px={6} py={4} shadow="md">
        <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
          <Heading size="md" color="white">
            AkauntAI
          </Heading>
          <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
            RRA Tax Assistant
          </Badge>
        </Flex>
      </Box>

      <Container maxW="1200px" py={8}>
        <ReceiptUploader onExtracted={setExtractedData} />

        {extractedData && (
          <Box mt={8} maxW="700px" mx="auto" p={6} bg="white" borderRadius="lg" shadow="sm">
            <Heading size="sm" mb={3}>
              Extracted Data (raw):
            </Heading>
            <Code
              p={4}
              borderRadius="md"
              display="block"
              whiteSpace="pre-wrap"
              fontSize="xs"
              bg="gray.100"
            >
              {JSON.stringify(extractedData, null, 2)}
            </Code>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default App