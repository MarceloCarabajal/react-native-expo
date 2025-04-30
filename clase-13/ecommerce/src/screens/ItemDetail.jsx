import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
// import allProducts from '../data/products.json'
import { addToCart } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

const ItemDetail = ({
  navigation,
  route, 
}) => {

  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const { height, width } = useWindowDimensions();

  const { productId : idSelected } = route.params;

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)

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
      <Button title='Volver' onPress={ () => navigation.goBack() }/>
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
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={ styles.price }>{product.price}</Text>
            <Button title="Add to cart" onPress={handleAddToCart} />
          </View>
        </View>
        ):
        (
          <Text>Loading...</Text>
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
});
