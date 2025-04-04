import { StyleSheet, Text, View, Platform, PlatformColor } from 'react-native'
import React from 'react'

const PlatformStyle = () => {
  return (
    <View>
      <Text style={styles.label}>PlatformStyle</Text>
      <View style={styles.platformBackground} />
    </View>
  )
}

export default PlatformStyle

const styles = StyleSheet.create({
    label: {
        ...Platform.select({
            ios: {
                fontSize: 20,
                color: 'blue',
            },
            android: {
                fontSize: 25,
                color: 'green',
            },
            default: {
                fontSize: 30,
                color: 'red',
            }
        })
    },
    platformBackground: {
        ...Platform.select({
            ios: {
                backgroundColor: PlatformColor('systemBlue'),
            },
            android: {
                backgroundColor: PlatformColor('systemIndigo'),
            },
            default: {
                backgroundColor: 'lightgray',
            }
        }),
        width: 100,
        height: 100,
    }
})