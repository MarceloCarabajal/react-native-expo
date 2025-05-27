import { Button, Image, StyleSheet, Text, View, useWindowDimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../services/shopServices';
// import allProducts from '../data/products.json'
import { addToCart } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';

const ItemDetail = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const { height, width } = useWindowDimensions();

  const { productId : idSelected } = route.params;

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)

  const [quantity, setQuantity] = useState(1);


  
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
    dispatch(addToCart({...product, quantity}))
    //Alert o tast para confirmar que se agregó al carrito
    Toast.show({
      type: 'success',
      text1: 'Product added to cart',
      text2: `${product.title} x ${quantity} units`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }
  
  return (
    <>
      <Button
        title='Back'
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
            <View style={ styles.quantityContainer}>
              <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>−</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
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
  },
  quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 10,
},
quantityButton: {
  backgroundColor: colors.teal600,
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 5,
  marginHorizontal: 5,
},
quantityButtonText: {
  color: "white",
  fontSize: 20,
  fontWeight: "bold",
},
quantityText: {
  fontSize: 18,
  fontWeight: "bold",
  color: colors.teal900,
},
});
