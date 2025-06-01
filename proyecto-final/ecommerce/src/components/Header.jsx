import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const Header = ({ route, navigation }) => {
  const { height, width } = useWindowDimensions();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground}]}>
      <Text
        style={[
          width > 360 ? styles.text : styles.textSm,
          { color: theme.text },
        ]}
      >
        { route.name }
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Josefin',
    fontSize: 24,
  },
  textSm: {
    fontFamily: 'Josefin',
    fontSize: 16,
  },
});