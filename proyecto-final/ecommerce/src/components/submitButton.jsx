import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

const SubmitButton = ({ onPress, title, isDarkMode }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? colors.teal200 : colors.teal600 },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: isDarkMode ? colors.teal900 : colors.platinum },
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
    backgroundColor: colors.teal600,
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
