// components/ThemeToggleButton.js
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { getTheme } from "../global/theme";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = getTheme(isDarkMode);

  return (
    <Pressable style={[styles.button, { backgroundColor: theme.buttonBackground }]} onPress={toggleTheme}>
      <Text style={[styles.text, { color: theme.buttonText }]}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </Text>
    </Pressable>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#333",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});

