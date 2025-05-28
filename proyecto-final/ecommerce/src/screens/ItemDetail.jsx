import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../services/shopServices';
import { addToCart } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const ItemDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState('portrait');
  const { height, width } = useWindowDimensions();
  const { productId: idSelected } = route.params;

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setOrientation(width > height ? 'landscape' : 'portrait');
  }, [width, height]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    Toast.show({
      type: 'success',
      text1: 'Product added to cart',
      text2: `${product.title} x ${quantity} units`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  if (error) return <Text>Error loading product details.</Text>;

  return (
    <>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={20} color={colors.teal900} />
          <Text style={[styles.backButtonText, { marginLeft: 5 }]}>Back</Text>
        </View>
      </Pressable>

      {product ? (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={
              orientation === 'portrait'
                ? styles.mainContainer
                : styles.mainContainerLandscape
            }
          >
            <Image
              source={{ uri: product.images[0] }}
              resizeMode="contain"
              style={orientation === 'portrait' ? styles.image : styles.imageLandscape}
            />
            <View
              style={
                orientation === 'portrait'
                  ? styles.textContainer
                  : styles.textContainerLandscape
              }
            >
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>{`$${product.price}`}</Text>
            </View>
          </ScrollView>

          {/* Botón fijo abajo */}
          <View style={styles.bottomBar}>
            <View style={styles.quantityContainer}>
              <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>−</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                pressed && styles.addButtonPressed,
              ]}
              onPress={handleAddToCart}
            >
              <Text style={styles.addButtonText}>Add to cart</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color={colors.teal600} />
      )}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
  },
  mainContainer: {
    padding: 20,
    paddingBottom: 130, // espacio para el botón fijo
  },
  mainContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    gap: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  imageLandscape: {
    width: '45%',
    height: 200,
  },
  textContainer: {
    flexDirection: 'column',
  },
  textContainerLandscape: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
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
    textAlign: 'right',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    color: colors.teal400,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.platinum,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.teal200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: colors.teal600,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.teal900,
  },
  addButton: {
  backgroundColor: colors.teal600,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5, // para Android
},
addButtonPressed: {
  backgroundColor: colors.teal700,
},
addButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  
},
backButton: {
  alignSelf: 'flex-start',
  backgroundColor: colors.teal200,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},
backButtonPressed: {
  backgroundColor: colors.teal300,
},
backButtonText: {
  fontSize: 16,
  color: colors.teal900,
  fontWeight: 'bold',
},


});
