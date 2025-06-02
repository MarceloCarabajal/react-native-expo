import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { useSession } from "../hooks/useSession";
import { loginSchema } from "../validations/authSchema";
import { useTheme } from "../hooks/useTheme";
// import { useDb } from '../hooks/useDb';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();
  const { insertSession } = useSession();
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { isDarkMode, theme } = useTheme();
  
  useEffect(() => {
    if (result.isSuccess) {
      (async () => {
        try {
          await insertSession({
            localId: result.data.localId,
            email: result.data.email,
            token: result.data.idToken,
          });
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        } catch (error) {
          console.error("Error inserting session:", error);
          Alert.alert("Error", "Failed to save session data.");
        }
      })();
    }
  }, [result]);

  useEffect(() => {
    if (result.isError && submitted) {
      Alert.alert(
        "Login failed",
        "Please check your credentials and try again."
      );
      setSubmitted(false);
    }
  }, [result, submitted]);

  // 🔍 Validación en tiempo real
  const validateField = async (field, value) => {
    try {
      await loginSchema.validateAt(field, { email, password, [field]: value });
      field === "email" ? setErrorMail("") : setErrorPassword("");
    } catch (error) {
      field === "email"
        ? setErrorMail(error.message)
        : setErrorPassword(error.message);
    }
  };

  // Handlers con validación en tiempo real
  const handleEmailChange = (value) => {
    setEmail(value);
    validateField("email", value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    validateField("password", value);
  };

  const onSubmit = () => {
    setErrorMail("");
    setErrorPassword("");
    setSubmitted(true);

    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });
      triggerSignIn({ email, password, returnSecureToken: true });
    } catch (err) {
      setSubmitted(false);
      err.inner?.forEach((error) => {
        if (error.path === "email") setErrorMail(error.message);
        if (error.path === "password") setErrorPassword(error.message);
      });
    }
  };

  if (result.isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.screenBackground }]}>
        <ActivityIndicator size="large" color={theme.border} />
      </View>
    );
  }

  return (
    <View style={[styles.main, { backgroundColor: theme.screenBackground }]}>
      <View
        style={[styles.container, { backgroundColor: theme.cardBackground }]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Login to start
        </Text>

        <InputForm
          label="email"
          onChange={handleEmailChange}
          error={errorMail}
        />
        <InputForm
          label="password"
          onChange={handlePasswordChange}
          error={errorPassword}
          isSecure
        />

        <SubmitButton onPress={onSubmit} title="Send" />

        <Text style={[styles.sub, { color: theme.text }]}>
          Not have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={[styles.subLink, { color: theme.text }]}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontFamily: "Josefin",
    marginBottom: 10,
  },
  sub: {
    fontSize: 14,
  },
  subLink: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
