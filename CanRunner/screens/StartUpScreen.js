import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import Colors from "../constants/Colors";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Login");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiresIn } = transformedData;

      const expirationDate = new Date(expiresIn);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Login");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate("HomeScreen");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
