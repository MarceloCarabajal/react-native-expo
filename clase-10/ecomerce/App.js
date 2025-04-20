import { colors } from "./src/global/colors";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Navigator from "./src/navigation/Navigator";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    //alignItems: "center", // el problema de la clase pasada
    backgroundColor: colors.teal200,
  },
});

export default App;
