import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePiker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { setImageCamera } from '../features/User/userSlice'
import { colors } from '../global/colors'
import { usePostProfileImageMutation } from '../services/shopServices'
import { Ionicons } from '@expo/vector-icons'

const ImageSelector = ({ navigation }) => {

    const [image, setImage] = useState(null)
    const [triggerPostImage, result] = usePostProfileImageMutation()
    const {localId} = useSelector((state) => state.auth.value)
    const dispatch = useDispatch()

    const pickImage = async () => {
        const {granted} = await ImagePiker.requestCameraPermissionsAsync()
        if (granted) {
            let result = await ImagePiker.launchCameraAsync({
                mediaTypes: ImagePiker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.5,
            })

        if (!result.canceled) {
            const image = `data:image/jpg;base64,${result.assets[0].base64}`
            setImage(image)
            }
        }
    }

    const confirmImage = () => {
        try {
            dispatch(setImageCamera(image))
            triggerPostImage({image, localId})
            navigation.goBack()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your photo</Text>

      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="camera-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Take another photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={confirmImage}>
            <Ionicons name="checkmark-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text>No photo selected</Text>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="camera-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Take photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Josefin',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: colors.teal400,
    borderWidth: 3,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.teal400,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  placeholderContainer: {
    alignItems: 'center',
    gap: 20,
  },
})