import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import OrdersTemp from '../screens/Orders'
import OrdersScreen from '../screens/Orders'
import OrderDetailScreen from '../screens/OrderDetailScreen'

const Stack = createNativeStackNavigator()

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen 
          name="OrdersScreen" 
          component={OrdersScreen} 
        />
        <Stack.Screen 
          name="OrderDetail" 
          component={OrderDetailScreen} 
        />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator
