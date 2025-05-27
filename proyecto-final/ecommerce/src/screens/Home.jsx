import { FlatList, StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import { colors } from '../global/colors'
import CategoryItem from '../components/CategoryItem'
//import Counter from '../components/Counter'
import { useGetCategoriesQuery } from '../services/shopServices'

const Home = ({ route, navigation }) => {
  const {data: categories, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.teal900} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar categorías.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* <Counter /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(itemElement) => itemElement}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation = {navigation} />
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.teal400,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.teal400,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.teal400,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  flatListContent: {
  alignItems: "center",
  paddingVertical: 20,
},
})
