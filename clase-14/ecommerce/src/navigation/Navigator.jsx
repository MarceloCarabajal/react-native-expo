import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useSelector } from 'react-redux'


const Navigator = () => {
  // const [user, setUser] = useState("")
  const {user} = useSelector(state => state.auth.value) // user es el valor del slice de redux
  return (
  <NavigationContainer>
    {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
  </NavigationContainer>  
  );
}

export default Navigator