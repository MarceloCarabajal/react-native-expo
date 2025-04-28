import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="(home)" />
        <Tabs.Screen name="characters" />
        <Tabs.Screen name="planets" />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})