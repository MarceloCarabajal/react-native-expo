import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartTemp from '../screens/CartTemp'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartTemp}
        options={{
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  )
}

export default CartStackNavigator

const styles = StyleSheet.create({})