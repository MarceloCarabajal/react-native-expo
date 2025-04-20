import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartiItem from '../components/CartiItem'

const CartTemp = () => {
  return (
    <View>
      <FlatList 
        data={CartData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CartiItem cartItem={item} />}
      />

      <View>
        <Pressable>
          <Text>Checkout</Text>
        </Pressable>
        <Text>Total: </Text>
      </View>
      
    </View>

    
  )
}

export default CartTemp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
})