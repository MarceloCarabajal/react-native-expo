import { StyleSheet,View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const Card = ({children, style}) => {
    //console.log(children)
  return (
    <View style={{...styles.container, ...style}}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.teal600,
    width: 250,
    height: 40,
    shadowColor: colors.platinum,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
