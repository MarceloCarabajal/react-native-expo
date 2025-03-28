import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Image, ScrollView, Text, View } from 'react-native';

import { globalStyles } from './styles/global';


export default function App() {

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Image style={globalStyles.banner} source={require("./assets/gokussj4.jpeg")} />
      </View>

      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Dragon Ball</Text>
      </View>

      <ScrollView horizontal>
        <View>
          <Image
            style={globalStyles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={globalStyles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={globalStyles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>
        <View>
          <Image
            style={globalStyles.film}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </ScrollView>

      <Text style={globalStyles.title}> Avengers Originales </Text>

      <View style={globalStyles.listado}>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View style={globalStyles.listadoItem}>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </View>

      <Text style={globalStyles.title}> Peliculas </Text>

      <View>
        <View>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

        <View>
          <Image
            style={globalStyles.character}
            source={require("./assets/gokussj4.jpeg")}
          />
        </View>

      </View>

    </ScrollView>


  );
}
