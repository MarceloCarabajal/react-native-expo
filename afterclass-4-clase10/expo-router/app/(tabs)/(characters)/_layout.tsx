import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CharacterLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="details" />
    </Stack>
  )
}

export default CharacterLayout

const styles = StyleSheet.create({})