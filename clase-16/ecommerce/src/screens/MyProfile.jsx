import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopServices'
import { useDb } from '../hooks/useDb'
import { clearUser } from '../features/User/userSlice'

const MyProfile = ({navigation}) => {

    const {imageCamera, localId} = useSelector((state) => state.auth.value)
    const {data: imageFromDB} = useGetProfileImageQuery(localId)
    const { truncateSessionTable } = useDb()
    const dispatch = useDispatch()

    const launchCamera = () => {
        navigation.navigate('Image Selector')
    }

    const defaultImage = require('../../assets/images/profile-default.jpg')

    const launchLocation = () => {
        navigation.navigate('List Address')
    }

    const signOut = () => {
        try {
            const response = truncateSessionTable()
            dispatch(clearUser())
        } catch (error) {
            console.log("Error signing out", error);
        }
    }

  return (
    <View style={styles.container}>
        {imageFromDB || imageCamera ? 
        (
            <Image 
                source={{ uri: imageFromDB?.image || imageCamera }}
                style={styles.image}
                resizeMode='cover'
            />
        ) 
        : 
        (
            <Image 
                source={defaultImage}
                style={styles.image}
                resizeMode='cover'
            />
        )
        }
        <Button title='Add picture profile' onPress={launchCamera} />
        <Button title='My Address' onPress={launchLocation} />
        <Button title='Sign out' onPress={signOut} />
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})