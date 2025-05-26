import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../features/Cart/cartSlice';

const CartiItem = ({ cartItem }) => {

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({ id: cartItem.id }))
  }

  const handleIncrease = () => {
    dispatch(increaseQuantity({ id: cartItem.id }))
  }

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ id: cartItem.id }))
  }

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{cartItem.title}</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>Precio: {(cartItem.price).toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS'
          })}
        </Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={handleDecrease} style={styles.button}>
            <Text style={styles.buttonText}>−</Text>
          </Pressable>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <Pressable onPress={handleIncrease} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.text2}>Subtotal: {(cartItem.price * cartItem.quantity).toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS'
          })}
        </Text>
      </View>
      <Entypo name="trash" size={30} color="black" onPress={handleRemove} />
      
    </View>
  )
}

export default CartiItem

const styles = StyleSheet.create({
    card: {
      height: 150,
      backgroundColor: colors.platinum,
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
      color: colors.teal400,
    },
    text2: {
      fontFamily: 'Josefin',
      fontSize: 16,
      color: colors.teal600,
    },
    quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.teal600,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  quantity: {
    fontSize: 18,
    fontFamily: 'Josefin',
    color: colors.teal900,
  },
})