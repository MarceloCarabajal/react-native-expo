import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CartTemp from '../screens/CartTemp'
import OrdersTemp from '../screens/OrdersTemp'
import HomeStackNavigator from './HomeStackNavigator'

import Header from '../components/Header'
import { colors } from '../global/colors'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => {
          return <Header route={route} />
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="HomeScreemNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? "black" : colors.teal400}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen 
      name="Cart" 
      component={CartTemp} 
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Entypo 
                name="shopping-cart"  
                size={24} 
                color= {focused ? "black" : colors.teal400} />
            </View>
          )
        }
      }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersTemp} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6 
                  name="receipt" 
                  size={24} 
                  color={focused ? "black": colors.teal400} />
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.teal200,
    shadowColor: 'black',
    elevation: 4,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 15,
    height: 90,
  }
})