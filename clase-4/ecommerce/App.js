import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';

const productsExample = [
  { id: 1, value: "Mate" },
  { id: 2, value: "Cafe" },
  { id: 3, value: "Harina" },
  { id: 4, value: "Palmitos" },
  { id: 5, value: "Yerba" },
  { id: 6, value: "Mermelada" },
  { id: 7, value: "Cacao" },
  { id: 8, value: "Picadillo" },
  { id: 9, value: "Pate" },
  { id: 10, value: "Caballa" },
  { id: 11, value: "Arroz" },
  { id: 12, value: "Arvejas" },
  { id: 13, value: "Sadinas" },
  { id: 14, value: "Atun" },
  { id: 15, value: "Choclo" },
  { id: 16, value: "Lentejas" },
];


export default function App() {

  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState(productsExample)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})


  const handleChangeText = (text) => {
    console.log(text)
    setTextItem(text) 
  }

  const addItem = () => {
    console.log("add item")
    setItemList( currentValue => [...currentValue, {id: Math.random(), value: textItem}])
    setTextItem("")
  }

  const handleModal = (item) => {
    //console.log(item)
    setItemSelected(item)
    setModalVisible(true)
    //Alert.alert(item)
  }

    const handleCancelModal = () => {
      
      setModalVisible(false);
    };

    const handleDeleteModal = () => {
      console.log("delete item")
      const filter = itemList.filter((item) => item.id !== itemSelected.id);
      setItemList(filter);
      setModalVisible(false);
    }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={textItem}
          onChangeText={handleChangeText}
          style={styles.input}
        />
        <Button title="Agregar" color="#5555ff" onPress={addItem} />
      </View>
      <View style={styles.productsContainer}>
        <FlatList
          keyExtractor={(product) => product.id.toString()}
          data={itemList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleModal(item)}
              style={styles.product}
            >
              <Text style={styles.productText}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text>Estas seguro que queres borrar este item</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{itemSelected.value}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button title="Borrar" color="#ff5555" onPress={handleDeleteModal}/>
            <Button title="Cancelar" color="#55ff55" onPress={handleCancelModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 24,
    width: 250,
  },
  productsContainer: {
    marginTop: 15,
    paddingVertical: 10,
    width: "90%",
  },
  product: {
    alignItems: "center",
    backgroundColor: "#cccccc",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 15,
  },
  productText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 20,
  },
  textContainer: {
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    alignContent: "center",
    gap: 20,
    paddingVertical: 20,
    borderRadius: 8,
  },
});