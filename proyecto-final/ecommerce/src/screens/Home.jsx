import { FlatList, StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import { colors } from '../global/colors'
import CategoryItem from '../components/CategoryItem'
//import Counter from '../components/Counter'
import { useGetCategoriesQuery } from '../services/shopServices'
import { useTheme } from '../hooks/useTheme'

const Home = ({ route, navigation }) => {
  const {data: categories, error, isLoading } = useGetCategoriesQuery();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.screenBackground }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.screenBackground }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Error al cargar categorías.</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.screenBackground }]}>
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
