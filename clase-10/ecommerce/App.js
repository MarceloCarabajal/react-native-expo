import { StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/global/colors';
import { useFonts } from 'expo-font';
import Navigator from './src/navigation/Navigator';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    Josefin: require('./assets/JosefinSans-Regular.ttf'),
  })

  if(!fontsLoaded || fontError) return null;

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    //alignItems: 'center',
    backgroundColor: colors.teal200
  },
});
