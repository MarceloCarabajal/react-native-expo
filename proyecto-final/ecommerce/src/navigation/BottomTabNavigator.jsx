import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStackNavigator from './HomeStackNavitagor'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import MyProfileStackNavigator from './MyProfileStackNavigator'

import Header from '../components/Header'
import { colors } from '../global/colors'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  const cartItems = useSelector((state) => state.cart.value.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header route={route} />,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.teal900,
        tabBarInactiveTintColor: colors.teal400,
      })}
    >
      <Tab.Screen
        name="Football Jersey eCommerce App"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
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
        tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Entypo
                name="shopping-cart"
                size={24}
                color={focused ? colors.teal900 : colors.teal400}
              />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          )
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
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 20,
    right: 20,
    backgroundColor: colors.teal200,
    borderRadius: 20,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  badge: {
  position: 'absolute',
  top: 5,             // antes estaba en -5
  right: 5,           // antes estaba en -10
  backgroundColor: 'red',
  borderRadius: 10,
  paddingHorizontal: 5,
  minWidth: 18,
  height: 18,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
},
  badgeText: {
  color: 'white',
  fontSize: 11,
  fontWeight: 'bold',
  textAlign: 'center',
},
})