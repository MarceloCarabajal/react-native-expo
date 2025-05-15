import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
// import allProducts from '../data/products.json'
import { addToCart } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { colors } from '../global/colors';

const ItemDetail = ({
  navigation,
  route, 
}) => {

  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const { height, width } = useWindowDimensions();

  const { productId : idSelected } = route.params;

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)

  
if (error) {
  return <Text>Error loading product details.</Text>;
}

  useEffect(() => {
    if (width > height) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  }, [width, height]);

  const handleAddToCart = () => {
    // enviar el producto a la porcion de estado del cart
    dispatch(addToCart({...product, quantity: 1}))
  }
  
  return (
    <>
      <Button
        title='Volver'
        color={colors.teal400}
        onPress={() => navigation.goBack()}
      />
      { product ?
        (
        <View style={
          orientation === "portrait" ? styles.mainContainer : styles.mainContainerLandscape 
        }>
          <Image 
            source={{ uri: product.images[0] }}
            resizeMode="contain"
            style={
              orientation === "portrait" 
                ? styles.image 
                : styles.imageLandscape
            }
            onError={(e) => console.log("Error loading image:", e.nativeEvent.error)}
          />
          <View style={
            orientation === "portrait"
              ? styles.textContainer
              : styles.textContainerLandscape
          }>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{`$${product.price}`}</Text>
            <Button title="Add to cart" color={colors.teal600} onPress={handleAddToCart} />
          </View>
        </View>
        ):
        (
          <ActivityIndicator size="large" color = {colors.teal600} />
        )
    }
      
    </>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.platinum,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1, 
    //backgroundColor: '#f5f5f5' 
  },
  imageLandscape: {
    width: "45%",
    height: 200
  },
  textContainer: { 
    flexDirection: "column" 
  },
  textContainerLandscape: { 
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start", 
  },
  price: { textAlign: "right", width: "100%" },
  title: {
  fontSize: 22,
  fontWeight: 'bold',
  color: colors.teal900,
  marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.teal600,
    marginBottom: 10,
  },
  price: {
    textAlign: "right",
    width: "100%",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    color: colors.teal400,
  }
});
