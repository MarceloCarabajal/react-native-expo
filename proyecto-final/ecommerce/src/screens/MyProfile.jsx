import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopServices";
// import { useDb } from '../hooks/useDb'
import { clearUser } from "../features/User/userSlice";
import { useSession } from "../hooks/useSession";
import { colors } from "../global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import ThemeToggleButton from "../components/ThemeToggleButton";

const MyProfile = ({ navigation }) => {
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromDB } = useGetProfileImageQuery(localId);
  const { truncateSessionTable } = useSession();
  const dispatch = useDispatch();
  const { isDarkMode, theme } = useTheme();

  const defaultImage = require("../../assets/images/profile-default.jpg");
  const profileImage = imageFromDB?.image || imageCamera || defaultImage;

  const signOut = () => {
    Alert.alert("Logout", "¿Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          truncateSessionTable();
          dispatch(clearUser());
        },
      },
    ]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.screenBackground }]}
    >
      <View style={styles.topRightIcon} >
        <ThemeToggleButton  />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof profileImage === "string"
              ? { uri: profileImage }
              : profileImage
          }
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate("Image Selector")}
        >
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.navigate("List Address")}
      >
        <Ionicons name="location-outline" size={20} color={theme.buttonText} />
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          My Locations
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={signOut}
      >
        <Ionicons name="log-out-outline" size={20} color={theme.buttonText} />
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    fontFamily: "Josefin",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 30,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.teal400,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.teal400,
    borderRadius: 20,
    padding: 5,
  },
  button: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: colors.teal400,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
  topRightIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  }
});
