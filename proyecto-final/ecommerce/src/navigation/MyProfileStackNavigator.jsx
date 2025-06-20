import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'
import ListAddress from '../screens/ListAddress'
import LocationSelector from '../screens/LocationSelector'

const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName="My Profile Home"
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen name="My Profile Home" component={MyProfile} />
      <Stack.Screen name='Image Selector' component={ImageSelector} />
      <Stack.Screen name='List Address' component={ListAddress} />
      <Stack.Screen name='Location Selector' component={LocationSelector} />
    </Stack.Navigator>
  )
}

export default MyProfileStackNavigator