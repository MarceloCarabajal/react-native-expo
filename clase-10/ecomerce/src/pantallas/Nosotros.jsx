import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const Nosotros = ({navigation, route}) => {
  //console.log(navigation)
  console.log(route)
  //const { id } = route.params;

  const visitarInicio = () => {
    //console.log(navigation)
    //console.log(route.params)
    
    //navigation.navigate("Inicio" );
    //navigation.push("Inicio")
    navigation.goBack();
  };
  return (
    <View>
      <Text>Nostros</Text>
      {/* <Text>{id}</Text> */}
      <Button title=" Ir a Inicio" onPress={()=> visitarInicio()}/>
    </View>
  )
}

export default Nosotros

const styles = StyleSheet.create({})
