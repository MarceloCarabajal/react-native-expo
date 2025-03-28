import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Red from './components/Red';
import Blue from './components/Blue';
import Green from './components/Green';

export default function App() {

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.banner} source={require("./assets/gokussj4.jpeg")} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Dragon Ball</Text>
      </View>

      <ScrollView horizontal>
        <View>
          <Image
            style={styles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={styles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={styles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={styles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </ScrollView>

      <Text style={styles.title}> Avengers Originales </Text>

      <View style={styles.listado}>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={styles.listadoItem}>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </View>

      <Text style={styles.title}> Peliculas </Text>

      <View>
        <View>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={styles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </View>

    </ScrollView>


  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    height: 250,
  },
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  film: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  listado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listadoItem: {
    flexBasis: "48%",
  },
  character: {
    width: "100%",
    height: 200,
    marginVertical: 8,
  },
});
