import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CartTemp from '../screens/Cart'
import OrdersTemp from '../screens/Orders'
import HomeStackNavigator from './HomeStackNavitagor'

import Header from '../components/Header'
import { colors } from '../global/colors'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import Ionicons from '@expo/vector-icons/Ionicons';
import MyProfileStackNavigator from './MyProfileStackNavigator'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header route={route} />
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="E-Commerce Marcelo"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? colors.teal900 : colors.teal400}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen 
      name="Cart" 
      component={CartStackNavigator} 
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View>
              <Entypo 
                name="shopping-cart"  
                size={24} 
                color= {focused ? colors.teal900 : colors.teal400} 
              />
            </View>
          )
        }
      }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrderStackNavigator} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome6 
                  name="receipt" 
                  size={24} 
                  color={focused ? colors.teal900 : colors.teal400} 
                />
              </View>
            )
          }
        }}
      />
      <Tab.Screen 
        name="My Profile" 
        component={MyProfileStackNavigator} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Ionicons 
                  name="person-circle" 
                  size={30} 
                  color={focused? colors.teal900 : colors.teal400}
                />
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.teal200,
    shadowColor: "black",
    elevation: 4,
    borderRadius: 15,
    height: 60,
  },
});

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: colors.teal200,
//     shadowColor: 'black',
//     elevation: 4,
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//     right: 20,
//     borderRadius: 15,
//     height: 90, 
//   }
// })