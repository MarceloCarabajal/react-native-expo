import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrdersData from '../data/orders.json'
import OrderItem from '../components/OrderItem'

const OrdersScreen = () => {
  return (
    <View>
      <FlatList 
        data={OrdersData}
        keyExtractor={(orderItem) => orderItem.id}
        renderItem={({ item }) => {
          return (
            <OrderItem 
              order={item} />
          )
        }}
      />
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})