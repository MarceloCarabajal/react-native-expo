import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import CartiItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopServices'
import { clearCart } from '../features/Cart/cartSlice'
import { colors } from '../global/colors'

const CartScreen = ({ navigation }) => {
  const { items: CartData, total } = useSelector((state) => state.cart.value)
  const { localId } = useSelector((state) => state.auth.value)
  const [triggerPostOrder, result] = usePostOrderMutation()
  const dispatch = useDispatch()
  
  const [isConfirming, setIsConfirming] = useState(false)

  const onConfirmOrder = async () => {
    setIsConfirming(true)
    try {
      await triggerPostOrder({
        items: CartData,
        user: localId,
        total: total,
        createdAt: new Date().toISOString(),
      }).unwrap()
      dispatch(clearCart())
      Alert.alert('¡Pedido confirmado!', 'Tu orden fue enviada con éxito.')
    } catch (err) {
      Alert.alert('Error', 'No se pudo confirmar el pedido.')
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <View style={styles.container}>
      {CartData.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.teal600 }}>No hay productos en el carrito</Text>
        </View>
      )}
      <FlatList 
        data={CartData}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => <CartiItem cartItem={item} />}
      />
      
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>
            Total: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
          </Text>
        </View>

        {isConfirming ? (
          <ActivityIndicator size="large" color={colors.teal600} style={{ marginTop: 10 }} />
        ) : (
          <Pressable 
            style={[
              styles.checkoutButton, 
              CartData.length === 0 && styles.disabledButton
            ]}
            onPress={onConfirmOrder}
            disabled={CartData.length === 0}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100,
  },
  totalContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    backgroundColor: colors.platinum,
  },
  totalBox: {
    marginBottom: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Josefin',
    color: colors.dark,
  },
  checkoutButton: {
    backgroundColor: colors.teal600,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.platinum,
    fontSize: 18,
    fontFamily: 'Josefin',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
})
