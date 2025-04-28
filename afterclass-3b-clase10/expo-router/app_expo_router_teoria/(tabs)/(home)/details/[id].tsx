import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const detailsScreen = () => {
    const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Details of user {id}</Text>
    </View>
  )
}

export default detailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})