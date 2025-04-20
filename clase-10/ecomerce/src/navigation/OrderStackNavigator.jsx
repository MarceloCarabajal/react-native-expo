import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrdersTemp from '../screens/OrdersTemp'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Orders" component={OrdersTemp} />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})
