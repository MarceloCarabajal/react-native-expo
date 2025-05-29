// components/ThemeToggleButton.js
import { Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/Theme/themeSlice";
import { useTheme } from "../hooks/useTheme";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  return (
    <Pressable style={styles.button} onPress={() => dispatch(toggleTheme())}>
      <Text style={styles.text}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </Text>
    </Pressable>
  );
};

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

export default ThemeToggleButton;
