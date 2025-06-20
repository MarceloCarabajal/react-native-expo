import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/Cart'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
      <Stack.Screen 
        name="CartScreen" 
        component={CartScreen} 
      />
    </Stack.Navigator>
  );
}

export default CartStackNavigator