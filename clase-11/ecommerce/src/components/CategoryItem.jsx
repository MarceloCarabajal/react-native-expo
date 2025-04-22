import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from 'react'
import Card from './Card'
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { setCategorySelected } from "../features/Shop/shopSlice";

const CategoryItem = ({ 
  category, 
  navigation 
}) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate("ItemListCategory", { category })
  }

  return (
    <Card style={{ marginVertical: 10, marginHorizontal: 10 }}>
      <Pressable 
        onPress={handleNavigate}
      >
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.platinum,
  }
})
