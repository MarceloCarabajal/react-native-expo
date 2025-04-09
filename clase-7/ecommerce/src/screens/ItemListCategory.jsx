import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import products from "../data/products.json"
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'

const ItemListCategory = ( {categorySelected = "", setCategorySelected = () => {} }) => {

  const [keyWord, setKeyWord] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  //console.log(categorySelected);
  
  useEffect(() => {
    const regex = /\d/
    const hasDigits = (regex.test(keyWord))
    //console.log(hasDigits);

    // Validamos que no contenga numeros
    if (hasDigits) {
      setError("No se permiten numeros")
      return
    } else {
      setError("")
    }

    // Filtramos los productos por categoria y por palabra clave
    const productsPrefiltered = products.filter(product => product.category === categorySelected)
    const productsFiltered = productsPrefiltered.filter(product => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
    setProductsFiltered(productsFiltered)
    setError("")

  }, [keyWord, categorySelected])

  return (
    <View>
      <Search error={error} onSearch={setKeyWord} goBack={() => setCategorySelected("")} />
      <FlatList 
        data={productsFiltered}
        renderItem={({item}) => <ProductItem product={item} />}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({})