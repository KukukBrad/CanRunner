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
import { ScrollView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PersonalInfoScreen = (props) => {
  var firebase = require("firebase");
  let DOB,
    SSN,
    startDate,
    carMake,
    carModel,
    carYear,
    carMilage,
    policyNumber,
    provider,
    e_name,
    e_phone,
    e_relation;

  let newUser = props.navigation.getParam("newUser");

  const setValues = (
    DOB,
    SSN,
    startDate,
    carMake,
    carModel,
    carYear,
    carMilage,
    policyNumber,
    provider,
    e_name,
    e_phone,
    e_relation
  ) => {
    newUser.DOB = DOB;
    newUser.SSN = SSN;
    newUser.startDate = startDate;
    newUser.carMake = carMake;
    newUser.carModel = carModel;
    newUser.carYear = carYear;
    newUser.carMilage = carMilage;
    newUser.insurancePolicyNumber = policyNumber;
    newUser.insuranceProvider = provider;
    newUser.e_Name = e_name;
    newUser.e_PhoneNumber = e_phone;
    newUser.e_Relation = e_relation;
  };

  const uploadUserToDataBase = (newUser) => {
    firebase
      .database()
      .ref("UsersList/" + newUser.fullName + "/PersonalInfomation/")
      .set({
        DOB: newUser.DOB,
        SSN: newUser.SSN,
        startDate: newUser.startDate,
        carMake: newUser.carMake,
        carModel: newUser.carModel,
        carYear: newUser.carYear,
        carMilage: newUser.carMilage,
        insuranceProvider: newUser.insuranceProvider,
        insurancePolicyNumber: newUser.insurancePolicyNumber,
        e_Name: newUser.e_Name,
        e_PhoneNumber: newUser.e_PhoneNumber,
        e_Relation: newUser.e_Relation,
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
            Please enter your personal information below
          </Text>
        </View>

        {/*Name */}
        <Text style={styles.textStyle}>Date of Birth: </Text>
        <TextInput
          placeholder=" MM/DD/YYYY"
          style={styles.inputStyle}
          onChangeText={(key) => {
            DOB = key;
          }}
        ></TextInput>

        <Text style={styles.textStyle}>Social Security Number: </Text>
        <TextInput
          placeholder="###-###-####"
          style={styles.inputStyle}
          onChangeText={(key) => {
            SSN = key;
          }}
        ></TextInput>

        <Text style={styles.textStyle}>Prefered Starting Date: </Text>
        <TextInput
          placeholder=" MM/DD/YYYY"
          style={styles.inputStyle}
          onChangeText={(key) => {
            startDate = key;
          }}
        ></TextInput>

        <Text style={styles.textStyle}>Vehicle Information: </Text>
        <TextInput
          placeholder="Make"
          style={styles.inputStyle}
          onChangeText={(key) => {
            carMake = key;
          }}
        ></TextInput>
        <TextInput
          placeholder="Model"
          style={styles.inputStyle}
          onChangeText={(key) => {
            carModel = key;
          }}
        ></TextInput>
        <TextInput
          placeholder="Year"
          style={styles.inputStyle}
          onChangeText={(key) => {
            carYear = key;
          }}
        ></TextInput>
        <TextInput
          placeholder="Current Milage"
          style={styles.inputStyle}
          onChangeText={(key) => {
            carMilage = key;
          }}
        ></TextInput>

        <Text style={styles.textStyle}>Auto Insurance Policy</Text>
        <TextInput
          placeholder=" Provider"
          style={styles.inputStyle}
          onChangeText={(key) => {
            provider = key;
          }}
        ></TextInput>
        <TextInput
          placeholder=" Policy Number"
          style={styles.inputStyle}
          onChangeText={(key) => {
            policyNumber = key;
          }}
        ></TextInput>

        <Text style={styles.textStyle}>Emergency Contact Information</Text>
        <TextInput
          placeholder=" Name"
          style={styles.inputStyle}
          onChangeText={(key) => {
            e_name = key;
          }}
        ></TextInput>
        <TextInput
          placeholder=" Phone Number"
          style={styles.inputStyle}
          onChangeText={(key) => {
            e_phone = key;
          }}
        ></TextInput>
        <TextInput
          placeholder=" Relation"
          style={styles.inputStyle}
          onChangeText={(key) => {
            e_relation = key;
          }}
        ></TextInput>

        {/* Navigate to Address*/}
        <TouchableOpacity
          style={styles.loginButtonStyle}
          onPress={() => {
            if (
              DOB === null ||
              SSN === null ||
              startDate === null ||
              carMake === null ||
              carModel === null ||
              carYear === null ||
              carMilage === null ||
              policyNumber === null ||
              provider === null ||
              e_name === null ||
              e_phone === null
            ) {
              Alert.alert(
                "Missing Required Field",
                "Please fill in all fields",
                null,
                null
              );
              return;
            }
            setValues(
              DOB,
              SSN,
              startDate,
              carMake,
              carModel,
              carYear,
              carMilage,
              policyNumber,
              provider,
              e_name,
              e_phone,
              e_relation
            );
            uploadUserToDataBase(newUser);
            props.navigation.navigate("Banking", {
              newUser: newUser,
            });
          }}
        >
          <Text style={styles.buttonText}> Confirm and Submit </Text>
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

export default PersonalInfoScreen;
