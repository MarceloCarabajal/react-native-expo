import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';

const Basicos = () => {
    const { width, height, scale, fontScale } = useWindowDimensions()

  return (
    <View style={{ 
        backgroundColor: '#192265', 
        padding: 20 
        }}>
      <Text style={styles.basicText}>Estilos Basicos</Text>
      <Text style={styles.bodyText}>Este es un componente</Text>
      <Text style={styles.bodyText}>Dimensiones de la pantalla son: {width}x{height} - scale: {scale} - font scale: {fontScale}</Text>

      <View 
        style= {{
            width: '50%',
            height: '50%',
            backgroundColor: '#5b5a78',
        }}
      />
      
      <View 
        style= {{
            position: 'absolute',
            bottom: 50,
            left: width / 2 - 25,
            width: 50,
            height: 50,
            backgroundColor: '#9620d4',
        }}
      />
    </View>
  )
}

export default Basicos

const styles = StyleSheet.create({
    basicText: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
    bodyText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
})

// Flexbox por defecto
// flexDirection column por defecto
// valores de las propiedades de cadenas de caracteres salvo que sea una unidad de medida
// las unidades de medida se representan con numeros
// podemos utilizar herramientas para calcular el tamaño de la pantalla
