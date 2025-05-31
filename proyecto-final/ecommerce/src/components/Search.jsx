import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../hooks/useTheme";

const Search = ({onSearch = ()=>{}, error="", goBack=()=>{}, value, onChangeText }) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.screenBackground, color: theme.border }]}>  
      <TextInput
        style={[styles.input, {
          backgroundColor: theme.inputBackground,
          color: theme.text,
          borderColor: theme.border,
          borderWidth: 1,
        }]}
        placeholder="Search..."
        placeholderTextColor={theme.text}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          onSearch(text); 
        }}
      />
      <Pressable onPress={() => onSearch(value)}>
        <FontAwesome name="search" size={24} color={theme.text} />
      </Pressable>
      <Pressable onPress={() => onChangeText("")}>
        <FontAwesome5 name="eraser" size={24} color={theme.text} />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color={theme.text} />
      </Pressable>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.teal400,
    color: colors.platinum,
    borderRadius: 10,
  },
});
