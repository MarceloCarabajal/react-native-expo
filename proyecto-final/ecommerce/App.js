import { StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
// import { colors } from './src/global/colors';

import { getTheme } from './src/global/theme';
import { useFonts } from 'expo-font';
import Navigator from './src/navigation/Navigator';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/store';
import { useSession } from './src/hooks/useSession';
// import { useDb } from './src/hooks/useDb';
import Toast from 'react-native-toast-message';
import { setDarkMode } from './src/features/Theme/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const { initDB } = useSession();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = getTheme(isDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(isDarkMode))
  }, [isDarkMode]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.screenBackground }
      ]}
    >
      <Navigator />
      <Toast />
    </SafeAreaView>
  )
}

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require('./assets/JosefinSans-Regular.ttf'),
  })

    useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme !== null) {
        store.dispatch(setDarkMode(JSON.parse(storedTheme)));
      }
    };
    loadTheme();
  }, []);

  if(!fontsLoaded || fontError) {
    return null;
  } 

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //alignItems: "center", // el problema de la clase pasada
  },
});

export default App;
