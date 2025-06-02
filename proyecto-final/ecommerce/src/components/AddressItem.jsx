import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

const AddressItem = ({ location, navigation }) => {
  const { theme } = useTheme();

  const onChangeLocation = () => {
    navigation.navigate("Location Selector");
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderBlockColor: theme.border,
        },
      ]}
      onPress={() => {}}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: theme.text }]}>
          {location.address}
        </Text>
      </View>
      <Pressable onPress={onChangeLocation}>
        <Entypo name="location" size={30} color={theme.buttonText}>
          <Text style={[styles.text2, { color: theme.buttonText }]}>
            Change
          </Text>
        </Entypo>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 17,
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 19,
    marginLeft: 10,
  },
});
