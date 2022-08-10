import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

export const theme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  dark: false,
  roundness: 12,
  version: 3,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#3D4252',
    secondary: '#1B1F2F',
    tertiary: '#F6EDED',
  },
};
