import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
//import OrdersData from '../data/orders.json'
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../services/shopServices";
import { useTheme } from "../hooks/useTheme";

const OrdersScreen = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: OrdersData, isLoading, isSuccess } = useGetOrdersQuery();
  const [ordersFiltered, setOrdersFiltered] = useState();
  const { theme } = useTheme();

  useEffect(() => {
    if (isSuccess) {
      const responseTransformed = Object.values(OrdersData);
      const ordersFiltered = responseTransformed.filter(
        (order) => order.user === localId
      );
      setOrdersFiltered(ordersFiltered);
    }
  }, [OrdersData, isSuccess, localId]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.screenBackground }]}
    >
      <FlatList
        data={ordersFiltered}
        renderItem={({ item }) => {
          return (
            <OrderItem
              order={item}
              onPress={() =>
                navigation.navigate("OrderDetail", { order: item })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
