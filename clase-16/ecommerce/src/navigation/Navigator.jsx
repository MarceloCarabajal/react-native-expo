import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { useDb } from '../hooks/useDb'
import { setUser } from '../features/User/userSlice'


const Navigator = () => {
  const dispatch = useDispatch()
  // const [user, setUser] = useState("")
  const {user} = useSelector(state => state.auth.value) // user es el valor del slice de redux
  const { getSession } = useDb()

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession()
        if (response) {
          const user = response;
          dispatch(setUser({
            localId: user.localId,
            email: user.email,
            idToken: user.token,
          }))
        }
      } catch (error) {
        console.log("Error getting session", error);
      }
    })()
  }, [user])


  return (
  <NavigationContainer>
    {!user ? <AuthStackNavigator /> : <BottomTabNavigator />}
  </NavigationContainer>  
  );
}

export default Navigator