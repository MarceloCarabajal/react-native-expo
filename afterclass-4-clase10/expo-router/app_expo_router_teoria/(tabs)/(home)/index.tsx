import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/details/1">Ver el id 1</Link>
      <Link href="/details/2">Ver el id 2</Link>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})