import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../hooks/useTheme";

const OrderItem = ({ order, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderBlockColor: theme.border,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: theme.text }]}>
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        <Text style={[styles.text2, { color: theme.text }]}>
          {order.total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </Text>
      </View>
      <FontAwesome name="search" size={24} color={theme.text} />
    </Pressable>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 20,
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 16,
  },
});
