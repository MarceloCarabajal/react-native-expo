import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrdersTemp from '../screens/Orders'
import OrdersScreen from '../screens/Orders'
import OrderDetailScreen from '../screens/OrderDetailScreen'

const Stack = createNativeStackNavigator()

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen 
          name="OrdersScreen" 
          component={OrdersScreen} 
        />
        <Stack.Screen 
          name="OrderDetail" 
          component={OrderDetailScreen} 
          // options={{
          //   title: "Detalle del pedido",
          //   headerShown: true,
          //   headerBackTitle: 'Back', // solo iOS
          // }}
        />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})