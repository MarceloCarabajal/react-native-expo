import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { usePostOrderMutation } from '../services/shopServices';
import { clearCart } from '../features/Cart/cartSlice';
import { useTheme } from '../hooks/useTheme';

const CartScreen = () => {
  const { theme } = useTheme();
  const { items: CartData, total } = useSelector((state) => state.cart.value);
  const { localId } = useSelector((state) => state.auth.value);
  const [triggerPostOrder] = usePostOrderMutation();
  const dispatch = useDispatch();

  const [isConfirming, setIsConfirming] = useState(false);

  const onConfirmOrder = async () => {
    setIsConfirming(true);
    try {
      await triggerPostOrder({
        items: CartData,
        user: localId,
        total,
        createdAt: new Date().toISOString(),
      }).unwrap();
      dispatch(clearCart());
      Alert.alert('Order confirmed!', 'Your order was sent successfully.');
    } catch {
      Alert.alert('Error', 'The order could not be confirmed.');
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.screenBackground }]}>
      {CartData.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
            There are no products in the cart
          </Text>
        </View>
      ) : (
        <FlatList
          data={CartData}
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => <CartItem cartItem={item} />}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      )}

      <View
        style={[
          styles.totalContainer,
          {
            backgroundColor: theme.cardBackground,
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.totalBox}>
          <Text style={[styles.totalText, { color: theme.text }]}>
            Total: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
          </Text>
        </View>

        {isConfirming ? (
          <ActivityIndicator size="large" color={theme.border} style={{ marginTop: 10 }} />
        ) : (
          <Pressable
            style={[
              styles.checkoutButton,
              {
                backgroundColor: CartData.length === 0 ? '#444' : theme.buttonBackground,
              },
            ]}
            onPress={onConfirmOrder}
            disabled={CartData.length === 0}
          >
            <Text style={[styles.checkoutButtonText, { color: theme.buttonText }]}>
              Checkout
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    paddingHorizontal: 20,
  },
  totalBox: {
    marginBottom: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Josefin',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontFamily: 'Josefin',
  },
});
