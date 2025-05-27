import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from 'react'
import Card from './Card'
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { setCategorySelected } from "../features/Shop/shopSlice";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate("ItemListCategory", { category })
  }

  return (
    <Card style={styles.card} >
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
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden', // importante para ripple en Android
  },
  pressable: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.teal600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontSize: 20,
    color: colors.platinum,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
})
