import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../hooks/useTheme";

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Text style={[styles.itemTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.itemText, { color: theme.secondaryText }]}>Quantity: {item.quantity}</Text>
      <Text style={[styles.itemText, { color: theme.secondaryText }]}>
        Unit Price:{" "}
        {item.price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </Text>
      <Text style={[styles.itemText, { color: theme.secondaryText }]}>
        Subtotal:{" "}
        {(item.quantity * item.price).toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.screenBackground }]}>
      {/* Botón personalizado para volver */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={32} color={theme.buttonBackground} />
        <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
      </Pressable>

      <Text style={[styles.title, { color: theme.text }]}>Order Date</Text>
      <Text style={[styles.text, { color: theme.secondaryText }]}>
        {new Date(order.createdAt).toLocaleString()}
      </Text>

      <Text style={[styles.title, { color: theme.text }]}>Products:</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={[styles.list]}
      />

      <Text style={[styles.title, { color: theme.text }]}>Total:</Text>
      <Text style={[styles.total, { color: theme.text }]}>
        {order.total.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </Text>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: "Josefin",
  },
  title: {
    fontSize: 18,
    fontFamily: "Josefin",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Josefin",
    marginBottom: 15,
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "Josefin",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "Josefin",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Josefin",
  },
});
