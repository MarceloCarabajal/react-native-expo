import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { useTheme } from "../hooks/useTheme";

const SubmitButton = ({ onPress, title }) => {
    const { isDarkMode, theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: theme.buttonBackground },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: theme.buttonText },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "60%",
  },
  text: {
    fontFamily: "PlayFair",
    fontSize: 22,
  },
});
