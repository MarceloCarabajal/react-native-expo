import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../services/shopServices';
import { addToCart } from '../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const ItemDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState('portrait');
  const { height, width } = useWindowDimensions();
  const { productId: idSelected } = route.params;

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);
  const [quantity, setQuantity] = useState(1);
  const { isDarkMode, theme } = useTheme();

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

  if (error) return <Text style={{ color: theme.text }}>Error loading product details.</Text>;

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.screenBackground }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.backButton,
          { backgroundColor: theme.buttonBackground },
          pressed && { backgroundColor: theme.secondaryText },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="arrow-back" size={20} color={theme.text} />
          <Text style={[styles.backButtonText, { color: theme.text, marginLeft: 5 }]}>Back</Text>
        </View>
      </Pressable>

      {product ? (
        <View style={[styles.container, { backgroundColor: theme.screenBackground }]}>
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
              <Text style={[styles.title, { color: theme.text}]}>{product.title}</Text>
              <Text style={[styles.description, { color: theme.border }]}>
                {product.description}
              </Text>
              <Text style={[styles.price, { color: theme.text }]}>
                {`$${product.price}`}
                </Text>
            </View>
          </ScrollView>

          {/* Botón fijo abajo */}
          <View style={[styles.bottomBar, { backgroundColor: theme.screenBackground, borderTopColor: theme.border }]}>
            <View style={styles.quantityContainer}>
              <Pressable onPress={decreaseQuantity} style={[styles.quantityButton, { backgroundColor: theme.buttonBackground }]}>
                <Text style={[styles.quantityButtonText, { color: theme.buttonText }]}>−</Text>
              </Pressable>
              <Text style={[styles.quantityText, { color: theme.text}]}>{quantity}</Text>
              <Pressable onPress={increaseQuantity} style={[styles.quantityButton, { backgroundColor: theme.buttonBackground }]}>
                <Text style={[styles.quantityButtonText, { color: theme.buttonText}]}>+</Text>
              </Pressable>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                { backgroundColor: theme.buttonBackground },
                pressed && styles.addButtonPressed,
              ]}
              onPress={handleAddToCart}
            >
              <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add to cart</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color={theme.border} />
      )}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: {
    padding: 20,
    paddingBottom: 130,
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
  textContainer: { flexDirection: 'column' },
  textContainerLandscape: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    textAlign: 'right',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonPressed: {},
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
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
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 10,
},
});