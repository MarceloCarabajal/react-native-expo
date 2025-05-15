import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
// import products from "../data/products.json"
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { colors } from '../global/colors'
import { useGetProductsByCategoryQuery } from '../services/shopServices'

const ItemListCategory = ({
  navigation,
  route, 
}) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const {category : categorySelected} = route.params;

  const {
    data: productFetched, 
    error: errorFromFetch, 
    isLoading
  } = useGetProductsByCategoryQuery(categorySelected)

  useEffect(()=>{
    const regex = /\d/;
    const hasDigits = (regex.test(keyWord))
    //console.log(hasDigits);
    if(hasDigits) {
      setError("No se permiten numeros")
      return
    }

    if(!isLoading) {
      const productsFilter = productFetched.filter((product) => 
        product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
      );
      setProductsFiltered(productsFilter);
      setError("")
      }
    }, [keyWord, categorySelected, productFetched, isLoading]);
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