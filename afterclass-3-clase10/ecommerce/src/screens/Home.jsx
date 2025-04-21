import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { colors } from '../global/colors'
import categories from '../data/categories.json'
import CategoryItem from '../components/CategoryItem'

const Home = ({ route, navigation }) => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories.sort()}
        renderItem={({ item }) => 
          <CategoryItem 
            category={item} 
            navigation = {navigation} 
          />}
        keyExtractor={(itemElement) => itemElement}
      />
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.teal400,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
