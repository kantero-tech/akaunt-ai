import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50:  '#E6F4F1',
      100: '#C2E3DC',
      500: '#006B5E',
      600: '#005A4F',
      700: '#004A41',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body:    `'Inter', sans-serif`,
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'brand' },
    },
  },
})