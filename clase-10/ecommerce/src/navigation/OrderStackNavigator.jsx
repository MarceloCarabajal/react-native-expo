import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrdersTemp from '../screens/Orders'

const Stack = createNativeStackNavigator()

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Orders"
            component={OrdersTemp}
        />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})