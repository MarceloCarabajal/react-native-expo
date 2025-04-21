import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import products from "../data/products.json"
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { colors } from '../global/colors'

const ItemListCategory = ({
  //categorySelected = "", 
  //setCategorySelected = ()=>{}, 
  //setItemIdSelected = () => {},
  navigation,
  route, 
}) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const {category : categorySelected} = route.params;

  useEffect(()=>{
    const regex = /\d/;
    const hasDigits = (regex.test(keyWord))
    //console.log(hasDigits);
    if(hasDigits) {
      setError("No se permiten numeros")
      return
    }
    const productsPrefiltered = products.filter(product => product.category === categorySelected)
    //console.log(productsPrefiltered) // todos los de la categoria
    const productsFilter = productsPrefiltered.filter(product => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
    //console.log(productsFilter)
    setProductsFiltered(productsFilter);
    setError("")

  }, [keyWord, categorySelected])
  return (
    <View>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => (
          <ProductItem 
            product={item} 
            navigation={navigation} 
        />)}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  );
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.teal400,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  }
})