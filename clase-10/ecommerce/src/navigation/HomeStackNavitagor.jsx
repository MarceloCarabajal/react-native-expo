import { StyleSheet } from 'react-native'
import React from 'react'
//import Header from '../components/Header'
import Home from '../screens/Home'
import ItemListCategory from '../screens/ItemListCategory'
import ItemDetail from '../screens/ItemDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

HomeStackNavigator = () => {
  //console.log(navigation);
  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ItemListCategory" component={ItemListCategory} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>

)}

export default HomeStackNavigator

const styles = StyleSheet.create({})