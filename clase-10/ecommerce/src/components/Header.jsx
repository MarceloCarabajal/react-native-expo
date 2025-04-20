import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const Header = ({route}) => {
  const { height, width } = useWindowDimensions();
  const { name } = route.name
  return (
    <View style={styles.container}>
      <Text style={ width > 360 ? styles.text : styles.textSm}>{name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: colors.teal900,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.teal200,
    fontFamily: "Josefin",
    fontSize: 24,
  },
  textSm: {
    color: colors.teal200,
    fontFamily: "Josefin",
    fontSize: 16,
  }
})
