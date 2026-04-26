import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  VStack,
} from '@chakra-ui/react'

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Top Nav */}
      <Box bg="brand.500" px={6} py={4} shadow="md">
        <Flex align="center" justify="space-between">
          <Heading size="md" color="white">
            AkauntAI
          </Heading>
          <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
            RRA Tax Assistant
          </Badge>
        </Flex>
      </Box>

      {/* Body */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="calc(100vh - 64px)"
      >
        <VStack spacing={4}>
          <Heading size="xl" color="brand.500">
            Welcome to AkauntAI
          </Heading>
          <Text color="gray.500" fontSize="lg">
            AI-powered EBM receipt scanner for Rwandan accountants
          </Text>
          <Badge colorScheme="teal" fontSize="md" px={4} py={2} borderRadius="full">
            ✅ Chakra UI is working
          </Badge>
        </VStack>
      </Flex>
    </Box>
  )
}

export default App