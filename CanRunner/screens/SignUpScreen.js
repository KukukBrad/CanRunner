import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  CheckBox,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import { useSelector } from "react-redux";
import User from "../models/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = (props) => {
  var firebase = require('firebase');
  let fullName = null;
  let phoneNumber = null;
  let email = null; 
  let password = null; 
  let email2 = null;
  let password2 = null;

  let newUser = new User();

  const setValues = (fullName, phoneNumber, email, password) => {
    newUser.fullName = fullName;
    newUser.phoneNumber = phoneNumber;
    newUser.email = email;
    newUser.password = password;
  };
  const uploadUserToDataBase = (newUser) => {
    firebase
      .database()
      .ref("UsersList/" + newUser.fullName )
      .set({
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        password: newUser.password,
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((error) => {
        //error callback
        console.log("error ", error);
      });
  };



  return (
    <KeyboardAwareScrollView flex="1" backgroundColor="#ffffff">
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.headerText}>Welcome to CanMonkey!</Text>
          <Text style={styles.headerText}>
            Please enter your information below
          </Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Name: </Text>
          <TextInput
            placeholder=" Full Name"
            style={styles.inputStyle}
            onChangeText={(key) => (fullName = key)}
          ></TextInput>

          {/*Phone Number */}
          <Text style={styles.textStyle}>Phone Number:</Text>
          <TextInput
            placeholder=" Phone Number"
            style={styles.inputStyle}
            onChangeText={(key) => (phoneNumber = key)}
          ></TextInput>

          {/*Email */}
          <Text style={styles.textStyle}>Email Address: </Text>
          <TextInput
            placeholder=" Email Address"
            style={styles.inputStyle}
            autoCapitalize={"none"}
            onChangeText={(key) => (email = key)}
          ></TextInput>
          <TextInput
            placeholder="Confirm Email Address"
            style={styles.inputStyle}
            autoCapitalize={"none"}
            onChangeText={(key) => (email2 = key)}
          ></TextInput>

          <View style={{ justifyContent: "flex-end" }}>
            <Text style={styles.textStyle}>Password:</Text>
            <TextInput
              placeholder=" Password (Must be 8 characters long) "
              style={styles.inputStyle}
              autoCapitalize={"none"}
              onChangeText={(key) => (password = key)}
            ></TextInput>
            <TextInput
              placeholder="Confirm Password"
              style={styles.inputStyle}
              autoCapitalize={"none"}
              onChangeText={(key) => (password2 = key)}
            ></TextInput>

            {/* Navigate to Address*/}
            <TouchableOpacity
              style={styles.loginButtonStyle}
              onPress={() => {
                if (
                  (fullName === null || phoneNumber === null || email === null,
                  password === null)
                ) {
                  Alert.alert(
                    "Missing Required Field",
                    "Please fill in all fields",
                    null,
                    null
                  );
                  return;
                }
                if(password2 != password){
                  Alert.alert("Passwords are Different", "Please enter the same password into both fields", null, null);
                  return;
                }

                if(email != email2){
                  Alert.alert("Emails are Different", "Please enter the same email into both fields", null, null);
                  return;
                }

                if(password.length < 7)
                {
                  Alert.alert("Password is Too Short", "Password Must be 8 characters long", null, null);
                  return;
                }

                if(phoneNumber.length < 10){
                  Alert.alert("Please Enter a full Phone Number", "Please enter in a correct phone number", null, null);
                  return;
                }


                setValues(fullName, phoneNumber, email, password);
                uploadUserToDataBase(newUser);
                props.navigation.navigate("Address", {
                  newUser: newUser,
                });
              }}
            >
              <Text style={styles.buttonText}> Continue </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 5,
    color: "#ffffff",
  },

  textStyle: {
    fontSize: 20,
    alignSelf: "auto",
    paddingTop: 10,
    paddingLeft: 15,
    color: "#000000",
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
    color: "#ffffff",
    textAlign: "center",
  },

  viewStyle: {
    backgroundColor: "#FFA500",
    color: "#FFFFFF",
    justifyContent: "flex-end",
  },
});

export default SignUpScreen;
