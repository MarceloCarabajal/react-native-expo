import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../data/products.json'

const ItemDetail = ({
  navigation,
  route, 
}) => {
  //console.log("idSelected", idSelected);
  //console.log("setProductSelected", setProductSelected);
  const [product, setProduct] = useState(null);
  const [orientation, setOrientation] = useState("portrait");
  const { height, width } = useWindowDimensions();

  const { productId : idSelected } = route.params;

  useEffect(() => {
    if (width > height) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  }, [idSelected]);

  useEffect(() => {
    const productSelected = allProducts.find((product) => product.id === idSelected);
    if (productSelected) {
      setProduct(productSelected);
    } else {
      setProduct(null);
    }
  }, [idSelected]);
  
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
            <Button title="Add to cart"/>
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
