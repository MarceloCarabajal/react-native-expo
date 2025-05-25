import { StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import { colors } from './src/global/colors';
import { useFonts } from 'expo-font';
import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store';
import { useSession } from './src/hooks/useSession';
// import { useDb } from './src/hooks/useDb';


const App = () => {
  const { initDB } = useSession();
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require('./assets/JosefinSans-Regular.ttf'),
  })

  useEffect(() => {
    initDB()
  }, [])

  if(!fontsLoaded || fontError) {
    return null;
  } 

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //alignItems: "center", // el problema de la clase pasada
    backgroundColor: colors.teal200
  },
});

export default App;
