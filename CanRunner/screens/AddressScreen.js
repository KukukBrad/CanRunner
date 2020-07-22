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
  Alert,
} from "react-native";
import { add } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddressScreen = (props) => {
  var firebase = require("firebase");
  let address,
    apt_suite,
    city,
    state,
    zipcode = null;

  let newUser = props.navigation.getParam("newUser");

  const setValues = (address, apt_suite, city, state, zipcode) => {
    newUser.address = address;
    newUser.apt_suite = apt_suite;
    newUser.city = city;
    newUser.state = state;
    newUser.zipCode = zipcode;
  };

  const uploadUserToDataBase = (newUser) => {
    firebase
      .database()
      .ref("UsersList/" + newUser.fullName + "/AddressInformation?")
      .set({
        address: newUser.address,
        apt_suite: newUser.apt_suite,
        city: newUser.city,
        state: newUser.state,
        zipCode: newUser.zipCode,
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
      <View flex="1" backgroundColor="#ffffff">
        <View style={styles.viewStyle}>
          <Text style={styles.headerText}>
            Please enter location information below
          </Text>
        </View>

        {/*Name */}
        <Text style={styles.textStyle}>Address: </Text>
        <TextInput
          placeholder=" Address"
          style={styles.inputStyle}
          onChangeText={(key) => (address = key)}
        ></TextInput>
        <TextInput
          placeholder="Apt/Suite/Lot"
          style={styles.inputStyle}
          onChangeText={(key) => (apt_suite = key)}
        ></TextInput>
        <TextInput
          placeholder="City"
          style={styles.inputStyle}
          onChangeText={(key) => (city = key)}
        ></TextInput>

        {/*Password */}
        <TextInput
          placeholder=" State"
          style={styles.inputStyle}
          onChangeText={(key) => (state = key)}
        ></TextInput>
        <TextInput
          placeholder="Zip Code"
          style={styles.inputStyle}
          onChangeText={(key) => (zipcode = key)}
        ></TextInput>

        {/* Navigate to Address*/}
        <TouchableOpacity
          style={styles.loginButtonStyle}
          onPress={() => {
            if (
              (address === null || 
              city === null ||
              state === null ||
              zipcode === null)
            ) {
              Alert.alert(
                "Missing Required Field",
                "Required Fields: Address, City, State, and  Zip Code",
                null,
                null
              );
              return;
            }
            setValues(address, apt_suite, city, state, zipcode);
            uploadUserToDataBase(newUser);
            props.navigation.navigate("PersonalInfo", {
              newUser: newUser,
            });
          }}
        >
          <Text style={styles.buttonText}> Continue </Text>
        </TouchableOpacity>
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
  },
});

export default AddressScreen;
