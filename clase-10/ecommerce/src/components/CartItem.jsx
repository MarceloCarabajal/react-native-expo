import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const CartiItem = ({cartItem}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{cartItem.title}</Text>
      <Text style={styles.text}>{cartItem.price}</Text>
    </View>
  )
}

export default CartiItem

const styles = StyleSheet.create({
    card: {
      height: 100,
      backgroundColor: colors.platinum,
      padding: 10,
      margin: 10,
      borderRadius: 10,
      borderWidth: 2,
      flexDirection: 'row',
    },
})