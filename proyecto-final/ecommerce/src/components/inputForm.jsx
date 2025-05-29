import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const InputForm = ({ 
    label, 
    onChange, 
    error = "", 
    isSecure = false,
}) => {
  const { isDarkMode, theme } = useTheme();
  const [input, setInput] = useState("");
  
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.subtitle, {color: theme.text}]}>{label}</Text>
      <TextInput
        style={[styles.input, 
            {
                color: theme.text,
                borderBlockColor: theme.inputBackground,
                backgroundColor: theme.inputBackground,
            },
        ]}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholderTextColor={theme.secondaryText}
      />
      {error ? (
        <Text style={styles.error}>
            {error}
        </Text>
    ) : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    width: "90%",
    fontSize: 16,
    fontFamily: "Josefin",
  },
  error: {
    paddingTop: 2,
    fontSize: 16,
    color: "red",
    fontFamily: "Josefin",
    fontStyle: "italic",
  },
  input: {
    width: "90%",
    borderBottomWidth: 3,
    padding: 2,
    fontFamily: "Josefin",
    fontSize: 14,
  },
});
