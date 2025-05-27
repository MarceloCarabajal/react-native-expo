import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopServices'
// import { useDb } from '../hooks/useDb'
import { clearUser } from '../features/User/userSlice'
import { useSession } from '../hooks/useSession'
import { colors } from '../global/colors'
import { Ionicons } from '@expo/vector-icons'

const MyProfile = ({ navigation }) => {

    const {imageCamera, localId} = useSelector((state) => state.auth.value)
    const {data: imageFromDB} = useGetProfileImageQuery(localId)
    const { truncateSessionTable } = useSession()
    const dispatch = useDispatch()

    const launchCamera = () => {
        navigation.navigate('Image Selector')
    }

    const defaultImage = require('../../assets/images/profile-default.jpg')
    const profileImage = imageFromDB?.image || imageCamera || defaultImage

    const signOut = () => {
        Alert.alert("Cerrar sesión", "¿Estás seguro de que quieres cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Salir", style: "destructive", onPress: () => {
                truncateSessionTable()
                dispatch(clearUser())
            }}
        ])
    }

    const launchLocation = () => {
        navigation.navigate('List Address')
    }



  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
            source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
            style={styles.image}
            resizeMode="cover"
            />
            <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('Image Selector')}>
            <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List Address')}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Mis Direcciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={signOut}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        </View>
  )
}

export default MyProfile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Josefin',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.teal400,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.teal400,
    borderRadius: 20,
    padding: 5,
  },
  button: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.teal400,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
})