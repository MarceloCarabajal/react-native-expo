import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { useGetProductsByCategoryQuery } from '../services/shopServices'
import { useTheme } from '../hooks/useTheme'

const ItemListCategory = ({ navigation, route }) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  const { category: categorySelected } = route.params;
  const { isDarkMode, theme } = useTheme();

  const {
    data: productFetched = [],
    error: errorFromFetch,
    isLoading
  } = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {
    const regex = /\d/;
    const hasDigits = regex.test(keyWord)
    if (hasDigits) {
      setError("No se permiten números")
      return
    }

    if (!isLoading && productFetched.length > 0) {
      const filtered = productFetched.filter((product) =>
        product.title.toLowerCase().includes(keyWord.toLowerCase())
      );
      setProductsFiltered(filtered);
      setError("");
    }
  }, [keyWord, categorySelected, productFetched, isLoading]);

  return (
    <View style={[styles.container, { backgroundColor: theme.screenBackground }]}>
      <Search
        error={error}
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
        value={keyWord}
        onChangeText={setKeyword}
      />

      {productsFiltered.length === 0 && !isLoading && !error ? (
        <Text style={[styles.noResultsText, { color: theme.secondaryText }]}>No products found</Text>
      ) : (
        <FlatList
          data={productsFiltered}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(producto) => producto.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  noResultsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
