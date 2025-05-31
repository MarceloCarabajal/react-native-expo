import { StyleSheet,View } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme'

const Card = ({ children, style }) => {
    //console.log(children)
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style, { backgroundColor: theme.buttonBackground }]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    width: 250,
    minHeight: 40,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
