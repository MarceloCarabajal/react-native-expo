import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/global/colors';
import Header from './src/components/Header';
import Home from './src/screens/Home';
import ItemListCategory from './src/screens/ItemListCategory';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title={"Titulo de la aplicación"} />
      <Home />
      <ItemListCategory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingTop:10,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: colors.info,
  },
});
