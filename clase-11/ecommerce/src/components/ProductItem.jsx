import { Image, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { setIdSelected } from "../features/Shop/shopSlice";

const ProductItem = ({ 
  product, 
  navigation,
  route,
}) => {

  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelected(product.id));
    navigation.navigate("ItemDetail", { productId: product.id });
  }
  return (
    <Card style={styles.additionalStylesCard}>
      <Pressable style={styles.pressable} onPress= {handleNavigate} >
        <Text style={styles.textCategory}>{product.title}</Text>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.images[0] }}
        />
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 100,
    borderRadius: 8,
  },
  additionalStylesCard: {
    paddingLeft: 10,
    flexDirection: "row",
    height: 120,
    width: 300,
    justifyContent: "space-between",
    margin: 10,
  },
  textCategory: {
    flex: 1,  // Ocupa espacio disponible
  marginRight: 10,
  color: colors.teal200,
  },
  pressable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //height: "100%",
  },
});
