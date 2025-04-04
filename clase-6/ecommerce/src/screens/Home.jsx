import { StyleSheet, FlatList, Text, View } from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import Categories from '../components/Categories'
import { colors } from '../global/colors'

const Home = () => {
  console.log(categories);
  
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data= {categories.sort()}
        renderItem={({item}) => <Categories category={item} />}
        keyExtractor={itemElement => itemElement }
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})