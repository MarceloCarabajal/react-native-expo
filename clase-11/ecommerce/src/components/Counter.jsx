import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'


const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    const [inputToAdd, setInputToAdd] = useState(0)
  return (
    <View>
      <Text>Counter</Text>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})