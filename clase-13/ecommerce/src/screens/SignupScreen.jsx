import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../global/colors';
import InputForm from '../components/inputForm';
import SubmitButton from '../components/submitButton';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { signUpSchema } from '../validations/authSchema';
import { setUser } from '../features/User/userSlice';

const SignupScreen = ({navigation}) => {
        const [email, setEmail] = useState("");
        const [errorMail, setErrorMail] = useState("");
        const [password, setPassword] = useState("");
        const [errorPassword, setErrorPassword] = useState("");
        const [confirmPassword, setconfirmPassword] = useState("");
        const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

        const dispatch = useDispatch();

        const [triggerSignUp, result] = useSignUpMutation();

        useEffect(() => {
            if (result?.isSuccess)
            dispatch(
                setUser({
                    email: result?.data?.email,
                    idToken: result?.data?.idToken,
                })
            )
        }, [result])

        const onSubmit = () => {
            try {
                setErrorMail("")
                setErrorPassword("")
                setErrorConfirmPassword("")
                signUpSchema.validateSync({email, password, confirmPassword})
                triggerSignUp({email, password, returnSecureToken: true})
            } catch (err) {
                console.log(err.errors);
                switch(err.path) {
                    case "email":
                        setErrorMail(err.message)
                        break;
                    case "password":
                        setErrorPassword(err.message)
                        break;
                    case "confirmPassword":
                        setErrorConfirmPassword(err.message)
                        break;
                    default:
                        break;
                }
            }           
            
        }

return (
  <View style={styles.main}>
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <InputForm label={"email"} onChange={setEmail} error={errorMail} />
      <InputForm
        label={"password"}
        onChange={setPassword}
        error={errorPassword}
        isSecure={true}
      />
      <InputForm
        label={"confirm password"}
        onChange={setconfirmPassword}
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
}

export default SignupScreen

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
    fontFamily: "Josefin",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "blue",
  },
});