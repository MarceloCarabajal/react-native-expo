import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import CartData from '../data/cart.json'
import CartiItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopServices'

const CartScreen = () => {

  const { items: CartData, total } = useSelector((state) => state.cart.value)
  const { localId } = useSelector((state) => state.auth.value)
  const [triggerPostOrder, result] = usePostOrderMutation()
  //const total = 333.99
  const dispatch = useDispatch()

  const onConfirmOrder = () => {
    console.log("Confirm Order");
    triggerPostOrder({
      items: CartData,
      user: localId, 
      total: total,
    })
    //limpiar el carrito
    //dispatch(clearCart())
  }


  return (
    <View style={styles.container}>
       <FlatList 
        data={CartData}
        keyExtractor={(product) => product.id}
        renderItem={({item}) => {
          return (
            <CartiItem 
              cartItem={item} 
            />
          )
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable onPress={onConfirmOrder}>
          <Text>Checkout</Text>
        </Pressable>
        <Text>Total: ${total}</Text>
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
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})