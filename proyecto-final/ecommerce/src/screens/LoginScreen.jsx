import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { colors } from "../global/colors";
import React, { useEffect, useState } from "react";

import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";

import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { useSession } from "../hooks/useSession";
import { loginSchema } from "../validations/authSchema";
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
          console.log("Error saving session", error);
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
      await loginSchema.validateAt(field, {
        email,
        password,
        [field]: value,
      });

      switch (field) {
        case "email":
          setErrorMail("");
          break;
        case "password":
          setErrorPassword("");
          break;
      }
    } catch (error) {
      switch (field) {
        case "email":
          setErrorMail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
      }
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
    // handle login logic here
    setErrorMail("");
    setErrorPassword("");
    setSubmitted(true);
    // triggerSignIn({ email, password });

    try {
      loginSchema.validateSync({ email, password }, { abortEarly: false });
      triggerSignIn({ email, password, returnSecureToken: true });
    } catch (err) {
      setSubmitted(false);
      if (err.inner) {
        err.inner.forEach((error) => {
          switch (error.path) {
            case "email":
              setErrorMail(error.message);
              break;
            case "password":
              setErrorPassword(error.message);
              break;
            default:
              console.error("Unexpected validation error:", error);
          }
        });
      }
    }
  };

  if (result.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.teal400} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to start</Text>
        <InputForm label={"email"} onChange={handleEmailChange} error={errorMail} />
        <InputForm
          label={"password"}
          onChange={handlePasswordChange}
          error={errorPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Not have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

// Estilo modernizado para LoginScreen
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.teal100,
  },
  container: {
    width: "85%",
    backgroundColor: colors.platinum,
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
    color: colors.teal900,
    marginBottom: 10,
  },
  sub: {
    fontSize: 14,
    color: colors.teal900,
  },
  subLink: {
    fontSize: 14,
    color: colors.blue400,
    textDecorationLine: "underline",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
