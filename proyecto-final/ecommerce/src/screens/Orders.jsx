import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//import OrdersData from '../data/orders.json'
import OrderItem from '../components/OrderItem'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../services/shopServices'

const OrdersScreen = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value)
  const { data: OrdersData, isLoading, isSuccess } = useGetOrdersQuery()
  const [ordersFiltered, setOrdersFiltered] = useState()

  useEffect(() => {
    if (isSuccess) {
      const responseTransformed = Object.values(OrdersData)
      const ordersFiltered = responseTransformed.filter(
        (order) => order.user === localId
      )
      setOrdersFiltered(ordersFiltered)
    }
  }, [OrdersData, isSuccess, localId])

  return (
    <View>
      <FlatList 
        data={ordersFiltered}
        renderItem={({ item }) => {
          return <OrderItem order={item} onPress={() => navigation.navigate("OrderDetail", {order: item })} />
        }}
      />
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})