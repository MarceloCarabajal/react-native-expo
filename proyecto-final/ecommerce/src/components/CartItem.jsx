import { StyleSheet, Text, View, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/Cart/cartSlice";
import { useTheme } from "../hooks/useTheme";

const CartiItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleRemove = () => {
    dispatch(removeFromCart({ id: cartItem.id }));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity({ id: cartItem.id }));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ id: cartItem.id }));
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: theme.text }]}>
          {cartItem.title}
        </Text>
        <Text style={[styles.text2, { color: theme.secondaryText }]}>
          {cartItem.brand}
        </Text>
        <Text style={[styles.text2, { color: theme.secondaryText }]}>
          Precio:{" "}
          {cartItem.price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </Text>

        <View style={styles.quantityContainer}>
          <Pressable
            onPress={handleDecrease}
            style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              −
            </Text>
          </Pressable>
          <Text style={[styles.quantity, { color: theme.text }]}>
            {cartItem.quantity}
          </Text>
          <Pressable
            onPress={handleIncrease}
            style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              +
            </Text>
          </Pressable>
        </View>

        <Text style={[styles.text2, { color: theme.secondaryText }]}>
          Subtotal: {(cartItem.price * cartItem.quantity).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </Text>
      </View>
      <Entypo name="trash" size={30} color={theme.secondaryText} onPress={handleRemove} />
    </View>
  );
};

export default CartiItem;

const styles = StyleSheet.create({
  card: {
    height: 200,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Josefin',
    fontSize: 20,
  },
  text2: {
    fontFamily: 'Josefin',
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  quantity: {
    fontSize: 18,
    fontFamily: 'Josefin',
  },
});