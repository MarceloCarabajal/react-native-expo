// components/ThemeToggleButton.js
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

const ThemeToggleButton = ({ style }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[styles.iconButton, style]}
      accessibilityLabel="Toggle Theme"
    >
      <Ionicons 
        name={isDarkMode ? "sunny-outline" : "moon-outline"}
        size={26}
        color={theme.buttonText}
      />
    </Pressable>
  );
};

export default ThemeToggleButton;

const styles = StyleSheet.create({
    iconButton: {
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
});
