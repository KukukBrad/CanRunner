import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { uploadUser, UPLOAD_USER } from "../store/actions/createUser";
import * as authActions from "../store/actions/auth";
import { auth } from "firebase";

const BankingScreen = (props) => {
  const dispatch = useDispatch();

  let finalUser = props.navigation.getParam("newUser");

  let nameOnAccount, nameOfBank, routingNumber, accountNumber;

  const setValues = (
    nameOnAccount,
    nameOfBank,
    routingNumber,
    accountNumber
  ) => {
    finalUser.bank_NameOnAccount = nameOnAccount;
    finalUser.bank_NameOfBank = nameOfBank;
    finalUser.bank_RoutingNumber = routingNumber;
    finalUser.bank_AccountNumber = accountNumber;
  };

  const upload = useSelector((state) => finalUser);

  var firebase = require("firebase");

  const uploadUserToDataBase = async (newUser) => {
    firebase
      .database()
      .ref("UsersList/" + newUser.fullName + "/BankingInformation/")
      .set({
        bank_NameOnAccount: newUser.bank_NameOnAccount,
        bank_NameOfBank: newUser.bank_NameOfBank,
        bank_RoutingNumber: newUser.bank_RoutingNumber,
        bank_AccountNumber: newUser.bank_AccountNumber,
        assignedRoute: " ",
        uid: " ",
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

  const signUpHandler = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        return result.user.updateProfile({
          displayName: finalUser.fullName,
        },
          AsyncStorage.setItem("UserName", (result.user.displayName).toString()),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <View style={styles.viewStyle}>
        <Text style={styles.headerText}>
          Please enter your Banking information below
        </Text>
      </View>
      <Text style={styles.textStyle}>Banking Information: </Text>
      <TextInput
        placeholder="Name on Account"
        style={styles.inputStyle}
        onChangeText={(key) => {
          nameOnAccount = key;
        }}
      ></TextInput>
      <TextInput
        placeholder="Name of Bank"
        style={styles.inputStyle}
        onChangeText={(key) => {
          nameOfBank = key;
        }}
      ></TextInput>
      <TextInput
        placeholder="Routing Number"
        style={styles.inputStyle}
        onChangeText={(key) => {
          routingNumber = key;
        }}
      ></TextInput>
      <TextInput
        placeholder="Account Number"
        style={styles.inputStyle}
        onChangeText={(key) => {
          accountNumber = key;
        }}
      ></TextInput>

      <TouchableOpacity
        style={styles.loginButtonStyle}
        onPress={() => {
          if (
            nameOnAccount === null ||
            nameOfBank === null ||
            routingNumber === null ||
            accountNumber === null
          ) {
            Alert.alert(
              "Missing Required Field",
              "Please fill in all fields",
              null,
              null
            );
            return;
          }
          setValues(nameOnAccount, nameOfBank, routingNumber, accountNumber);
          signUpHandler(finalUser.email, finalUser.password);
          try {
            uploadUserToDataBase(finalUser);
          }
          catch (error)
          {
            console.log(error)
          }

          props.navigation.navigate("Login", { userID: finalUser.fullName });
        }}
      >
        <Text style={styles.buttonText}> Confirm and Continue to Login </Text>
      </TouchableOpacity>
    </View>
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

  genderStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
    paddingRight: 115,
    paddingLeft: 5,
  },
  frame: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 200,
    backgroundColor: "blue",
  },
});

export default BankingScreen;
