import { Text, View, StyleSheet } from 'react-native';
import PlatformStyle from './components/bienvenidos/PlatformStyle';
// import Bienvenidos from './components/bienvenidos/Bienvenidos';
//import Condicinal from './components/Condicinal';
//import Flex from './components/Flex';
// import Basicos from './components/Basicos';

export default function App() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PlatformStyle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
