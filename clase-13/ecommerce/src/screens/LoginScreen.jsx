import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import React, { useEffect, useState } from "react";
import InputForm from '../components/inputForm';
import SubmitButton from '../components/submitButton';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/User/userSlice';

const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
      if (result.isSuccess) {
      //console.log("🕵🏻 ~ useEffect ~ result:", result);
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
  }, [result]); 


    // dispatch
    // triggerSignIn
    // useEffect


    const onSubmit = () => {
        // handle login logic here
        triggerSignIn({email, password })
    };

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.title}>Login to start</Text>
          <InputForm label={"email"} onChange={setEmail} error={""} />
          <InputForm
            label={"password"}
            onChange={setPassword}
            error={""}
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
}

export default LoginScreen

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.platinum,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});