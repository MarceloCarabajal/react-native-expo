import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { colors } from '../global/colors';
import MapPreview from '../components/MapPreview';
import { usePostLocationMutation } from '../services/shopServices';
import { useSelector } from 'react-redux';
import { googleMapsApiKey } from '../databases/googleMaps';

const LocationSelector = () => {

    const [location, setLocation] = useState({latitude: '', longitude: ''})
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')

    const [triggerPostUserLocation, result] = usePostLocationMutation()
    const { localId } = useSelector(state => state.auth.value)

    const onConfirmAddress = async () => {
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
                    let location = await Location.getCurrentPositionAsync({});
                    console.log(location);
                    
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                }
                // establecer la geolocalizacion con latitud y longitud    
            } catch (error) {
                console.log(error);
                setError('Error getting location')
            }
        })()
    }, [])

    useEffect(() => {
        // IIFE
        (async () => {
            try {
                if (location.latitude ) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`
                    const response = await fetch(url_reverse_geocode)
                    const data = await response.json()
                    console.log(data);
                    setAddress(data.results[0].formatted_address)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Address</Text>
      {/* Flatlist con las directions */}
      {location ? (
        <>
          <Text style={styles.text}>
            lat: {location.latitude}, long: {location.longitude}.
          </Text>
          <MapPreview location={location} />
          <Text style={styles.address}>Formatted address: {address}</Text>
          <Button onPress={onConfirmAddress} title="Confirm address" />
        </>
      ) : (
        <>
          <View style={styles.noLocationContainer}>
            <Text>{error}</Text>
          </View>
        </>
      )}
    </View>
  );
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
        paddingVertical: 20,
        fontFamily: "Josefin",
        fontSize: 18,
    },
    noLocationContainer: {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: colors.teal400,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    address: {
      padding: 10,
      fontSize: 16,
    },
  });