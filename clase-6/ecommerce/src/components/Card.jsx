import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ({children, style}) => {
    
  return (
    <View>
      <Text style={{ ...styles.container, ...style }}>
        {children}
      </Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: 250,
        height: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
})