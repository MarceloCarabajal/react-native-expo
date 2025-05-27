import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetLocationQuery } from '../services/shopServices'
import AddressItem from '../components/AddressItem'
import { colors } from '../global/colors'
import { Ionicons } from '@expo/vector-icons'

const ListAddress = ({ navigation }) => {

    const {localId} = useSelector(state => state.auth.value)
    const {data: location, isLoading, error} = useGetLocationQuery(localId)

  return location ? (
    <View style={styles.container}>
      <Text style={styles.title}>My Location</Text>
      <AddressItem location={location} navigation={navigation} />
    </View>
  ) : (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={60} color={colors.teal400} />
      <Text style={styles.text}>No Location set</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Location Selector')}
      >
        <Ionicons name="map-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Set Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Josefin',
    color: colors.teal400,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Josefin',
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.teal400,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
})


