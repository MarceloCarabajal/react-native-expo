import { StyleSheet, Text, View } from 'react-native'
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
import { useTheme } from '../hooks/useTheme'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  const cartItems = useSelector((state) => state.cart.value.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header route={route} />,
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.cardBackground }],
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.secondaryText,
      })}
    >
      <Tab.Screen
        name="Football Jersey eCommerce App"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name="store"
                  size={24}
                  color={focused ? theme.text : theme.secondaryText}
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
                color={focused ? theme.text : theme.secondaryText}
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
                  color={focused ? theme.text : theme.secondaryText} 
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
                  color={focused? theme.text : theme.secondaryText}
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
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
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
    top: 5,
    right: 5,
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