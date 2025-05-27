import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { usePostLocationMutation } from '../services/shopServices';
import { useSelector } from 'react-redux';
import { googleMapsApiKey } from '../databases/googleMaps';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../global/colors';
import { TouchableOpacity } from 'react-native';

const LocationSelector = ({ navigation }) => {

    const [location, setLocation] = useState({latitude: '', longitude: ''})
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const [triggerPostUserLocation, result] = usePostLocationMutation()
    const { localId } = useSelector(state => state.auth.value)

    const onConfirmAddress = () => {
        const date = new Date()
        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updateAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            },
            localId: localId,
        })
        navigation.navigate('List Address')
    }

    useEffect(() => {
        // IIFE
        (async () => {
            try {
                // pedir permiso de localizacion
                let {status} = await Location.requestForegroundPermissionsAsync()
                // comprobar si usuario da permiso
                if (status === 'granted') {
                    // obtener localizacion
                    let loc = await Location.getCurrentPositionAsync({});
                    console.log(loc);
                    
                    setLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    })
                } else {
                    setError('Permission to access location was denied');
                } 
            } catch (error) {
                console.log(error);
                setError('Error getting location')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

   // Obtener dirección
  useEffect(() => {
    if (location) {
      (async () => {
        try {
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`
          const response = await fetch(url)
          const data = await response.json()
          const formatted = data.results[0]?.formatted_address
          setAddress(formatted || 'Location not found')
        } catch (error) {
          setError('Error getting location')
        }
      })()
    }
  }, [location])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.teal400} />
        <Text style={styles.text}>Looking for location...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="warning-outline" size={50} color="red" />
        <Text style={[styles.text, { color: 'red' }]}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set My Address</Text>
      {/* Flatlist con las directions */}
       {location && (
        <>
          <MapPreview location={location} />
          <Text style={styles.address}>{address}</Text>
          <TouchableOpacity style={styles.button} onPress={onConfirmAddress}>
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Confirmar dirección</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default LocationSelector


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Josefin',
    fontWeight: '600',
    color: colors.teal400,
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Josefin',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.teal400,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Josefin',
    textAlign: 'center',
  },
})