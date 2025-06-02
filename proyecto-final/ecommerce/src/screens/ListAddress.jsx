import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useGetLocationQuery } from "../services/shopServices";
import AddressItem from "../components/AddressItem";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

const ListAddress = ({ navigation }) => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: location, isLoading, error } = useGetLocationQuery(localId);

  const { theme } = useTheme();

  return location ? (
    <View
      style={[styles.container, { backgroundColor: theme.screenBackground }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>My Location</Text>
      <AddressItem location={location} navigation={navigation} />
    </View>
  ) : (
    <View
      style={[styles.container, { backgroundColor: theme.screenBackground }]}
    >
      <Ionicons
        name="location-outline"
        size={60}
        color={theme.buttonBackground}
      />
      <Text style={[styles.text, { color: theme.text }]}>No Location set</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.navigate("Location Selector")}
      >
        <Ionicons name="map-outline" size={20} color={theme.buttonText} />
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Set Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "Josefin",
  },
  text: {
    fontSize: 18,
    fontFamily: "Josefin",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
