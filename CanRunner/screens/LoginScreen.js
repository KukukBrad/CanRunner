import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";

import HomeScreen from "./HomeScreen";

import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import {
  KeyboardAwareScrollView,
  KeyboardAwareFlatList,
} from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";



const LoginScreen = (props) => {
  var firebase = require('firebase');

  const initalState = {
    email: '',
    password: ''
}
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setItSignUp] = useState(false);
  const [Error, setError] = useState("");

  const authHandler = async () => {
    let action;

    if (isSignUp) {
      action = authActions.signup(
        initialState.email,
        initalState.password
      );
    } else {
      action = authActions.login(initalState.email, initalState.password);
    }
    setError(null);
    setIsLoading(true);
    try  {
      await dispatch(action);
      props.navigation.navigate("HomeScreen");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View flex="1" backgroundColor={Colors.primaryColor}>
      <KeyboardAwareScrollView>
        <Image
          source={require("../assets/CanMonkeyLogo3.png")}
          style={styles.imageStyle}
        ></Image>

        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(key) => {
            initalState.email = key;
          }}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(key) => {
            initalState.password = key;
          }}
        />

        <View style={styles.buttonStyle}>
          {isLoading ? (
            <ActivityIndicator size={"large"} color="Blue" />
          ) : (
            <Button
              title={"Login"}
              onPress={() => {
                try {
                  setItSignUp(false);
                  authHandler(initalState.email, initalState.password);
                } catch (err) {
                  return;
                }
              }}
              color={Colors.primaryColor}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.signUpButton}>
            Haven't Signed up? Sign up to be a Can Runner
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 300,
    marginTop: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
    shadowColor: "grey",
    shadowRadius: 2,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.26,
  },

  textStyle: {
    paddingLeft: 15,
  },

  inputStyle: {
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    padding: 10,
    borderColor: "#FFA500",
    borderWidth: 1,
    color: "#000000",
  },

  signUpButton: {
    fontSize: 10,
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  buttonStyle: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.26,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFA500",
    textAlign: "center",
    padding: 10,
  },

  inputStyle: {
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    padding: 10,
    borderColor: "grey",
    borderWidth: 2,
  },
});

export default LoginScreen;
