import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const OrderDetailScreen = ({ route, navigation }) => {
    const { order } = route.params

      const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemText}>Unit Price: {item.price.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
      })}</Text>
      <Text style={styles.itemText}>Subtotal: {(item.quantity * item.price).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
      })}</Text>
    </View>
    )

  return (
    <View style={styles.container}>
      {/* Botón personalizado para volver */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={32} color={colors.teal600} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Order Date</Text>
      <Text style={styles.text}>{new Date(order.createdAt).toLocaleString()}</Text>

      <Text style={styles.title}>Products:</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      <Text style={styles.title}>Total:</Text>
      <Text style={styles.total}>
        {order.total.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        })}
      </Text>
    </View>
  )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 18,
    color: colors.teal600,
    fontFamily: 'Josefin',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Josefin',
    marginBottom: 5,
    color: colors.teal600,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Josefin',
    marginBottom: 15,
    color: colors.dark,
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.platinum,
    borderWidth: 1,
    borderColor: colors.teal200,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Josefin',
    color: colors.teal800,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Josefin',
    color: colors.dark,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Josefin',
    color: colors.teal900,
  },
})