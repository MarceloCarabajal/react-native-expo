import { colors } from "./colors";

export const getTheme = (isDarkMode) => ({
  // Fondos
  screenBackground: isDarkMode ? colors.teal900 : colors.teal100,
  cardBackground: isDarkMode ? colors.gray900 : colors.platinum,

  // Texto
  text: isDarkMode ? colors.platinum : colors.teal900,
  secondaryText: isDarkMode ? colors.teal200 : colors.teal600,

  // Inputs y bordes
  border: isDarkMode ? colors.teal400 : colors.teal600,
  inputBackground: isDarkMode ? colors.gray900 : "#fff",

  // Botones
  buttonBackground: isDarkMode ? colors.teal600 : colors.teal400,
  buttonText: colors.platinum,

  // Enlaces
  link: colors.blue400,
});
