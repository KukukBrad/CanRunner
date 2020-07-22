import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth, firestore } from 'firebase';

const HomeScreen = (props) => {

  let firebase = require('firebase');

  const readUserData = () => {
    firebase
      .database()
      .ref("UsersList/" + currentUser)
      .on("value", function (snapshot) {
        console.log(snapshot.val());
      });
  };

  const dispatch = useDispatch();

  return (
    <View flex="1" backgroundColor="#FFA500">
      <Image
        source={require("../assets/CanMonkeyLogo2.png")}
        style={styles.imageStyle}
      ></Image>

      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => {
          //props.navigation.navigate("Routes", { fullname: props.fullname });
          console.log(temp);
        }}
      >
        <Text style={styles.buttonText}>Go to My Routes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => {
          props.navigation.navigate("Earning", { email: props.email });
        }}
      >
        <Text style={styles.buttonText}>Earnings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => {
          props.navigation.navigate("Feedback", { email: props.email });
        }}
      >
        <Text style={styles.buttonText}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => {
          props.navigation.navigate("MyAccount");
        }}
      >
        <Text style={styles.buttonText}>My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputStyle}
        onPress={() => {
          auth().signOut();
          props.navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
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
  },

  textStyle: {
    paddingLeft: 15,
  },

  inputStyle: {
    width: 300,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    alignSelf: "center",
  },

  TOStyle: {},

  loginButtonStyle: {
    width: 300,
    backgroundColor: "#FFA500",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
    alignSelf: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFA500",
    textAlign: "center",
  },

  signUpButton: {
    fontSize: 10,
    alignSelf: "center",
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
