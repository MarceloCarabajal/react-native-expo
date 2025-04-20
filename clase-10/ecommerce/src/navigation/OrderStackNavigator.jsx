import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrdersTemp from '../screens/OrdersTemp'

const Stack = createNativeStackNavigator()

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Order"
            component={OrdersTemp}
            options={{
            headerShown: false,
            }} 
        />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})