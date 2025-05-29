import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../global/colors";

import InputForm from "../components/inputForm";
import SubmitButton from "../components/submitButton";

import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../services/authService";
import { signUpSchema } from "../validations/authSchema";
import { setUser } from "../features/User/userSlice";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result?.isSuccess)
      dispatch(
        setUser({
          email: result?.data?.email,
          idToken: result?.data?.idToken,
          localId: result?.data?.localId,
        })
      );
  }, [result]);

  const validateField = async (field, value) => {
    try {
      await signUpSchema.validateAt(field, {
        email,
        password,
        confirmPassword,
        [field]: value, // actualiza el campo actual
      });

      switch (field) {
        case "email":
          setErrorMail("");
          break;
        case "password":
          setErrorPassword("");
          break;
        case "confirmPassword":
          setErrorConfirmPassword("");
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
        case "confirmPassword":
          setErrorConfirmPassword(error.message);
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

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    validateField("confirmPassword", value);
  };

  const onSubmit = () => {
    setErrorMail("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    try {
      signUpSchema.validateSync(
        { email, password, confirmPassword },
        { abortEarly: false }
      );

      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      console.log(err.errors);
      if (err.inner) {
        err.inner.forEach((error) => {
          switch (error.path) {
            case "email":
              setErrorMail(error.message);
              break;
            case "password":
              setErrorPassword(error.message);
              break;
            case "confirmPassword":
              setErrorConfirmPassword(error.message);
              break;
            default:
              console.log("Unexpected error:", error.message);
              break;
          }
        });
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>

        <InputForm label={"email"} onChange={handleEmailChange} error={errorMail} />
        <InputForm
          label={"password"}
          onChange={handlePasswordChange}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"confirm password"}
          onChange={handleConfirmPasswordChange}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

// Estilo modernizado para SignupScreen
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.teal50,
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
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontFamily: "Josefin",
    color: colors.teal800,
    marginBottom: 10,
  },
  sub: {
    fontSize: 14,
    color: colors.teal900,
  },
  subLink: {
    fontSize: 14,
    color: colors.blue400,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
