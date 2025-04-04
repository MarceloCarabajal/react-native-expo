import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Condicinal = () => {
    const [condicion, setCondicion] = useState(false)

    const getStyle = () => {
        return [styles.box, {
            backgroundColor: condicion ? 'red' : 'blue',
            width: 100,
            height: 100,
        }]
    }

  return (
    <View>
        <Button title='cambiar' onPress={() => setCondicion(!condicion)} />
        <View 
            style={{
                backgroundColor: condicion ? 'red' : 'blue',
                width: 200,
                height: 200,
            }}
        />
      <View style={getStyle()} />
    </View>
  )
}

export default Condicinal

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
    }
})