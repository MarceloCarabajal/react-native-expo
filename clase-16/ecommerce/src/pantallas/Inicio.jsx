import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const Inicio = ({navigation}) => {

    const info = {
        id: 1,
        total: 100,
        medidas: {
            peso: 100,
            altura: 200,
        },
        saludar: () => {
            console.log("Hola desde el objeto Inicio")
        }
    }

    const visitarNosotros = () => {
        navigation.navigate("Nosotros", info)
    }
  return (
    <View>
      <Text>Inicio</Text>
      <Button title="Ir a Nosotros" onPress={() => visitarNosotros()} />
    </View>
  )
}

export default Inicio

const styles = StyleSheet.create({})