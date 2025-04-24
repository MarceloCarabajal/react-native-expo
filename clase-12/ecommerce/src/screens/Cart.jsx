import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartiItem from '../components/CartItem'

const CartScreen = () => {

  const total = 333.99

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
        <Pressable>
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