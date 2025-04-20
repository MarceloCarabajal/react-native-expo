import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Inicio = ({navigation}) => {
  const info = {
    id: 4563456346,
    total: 667888,
    medidas: {peso: 100, alto: 160},
    saludar: ()=> {console.log("Hola desde Inicio")}
  }

  const visitarNosotros = () => {
    navigation.navigate("Nosotros", info)
  }
  return (
    <View>
      <Text>Inicio</Text>
       <Button title=" Ir a Nosotros" onPress={()=> visitarNosotros()}/> 
    </View>
  )
}

export default Inicio

const styles = StyleSheet.create({})
