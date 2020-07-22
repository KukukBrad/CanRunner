import React, { useEffect } from "react";
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
import { FlatList } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const MyAccountScreen = (props) => {

    var firebase = require("firebase");

    var currentUser = firebase.auth().currentUser.displayName;

    var fullname =  AsyncStorage.getItem('fullName');

    
  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.headerText}>Email Address</Text>
        <Text style={styles.bodyTest}></Text>
      </View>

      <View>
        <Text style={styles.headerText}>Phone Number</Text>
        <Text style={styles.bodyTest}></Text>
      </View>

      <View>
        <Text style={styles.headerText}></Text>
        <Text style={styles.bodyTest}></Text>
      </View>
    </View>
  );
};

MyAccountScreen.navigationOptions = {
  headerTintColor: "white",
  headerTitle: "My Account",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accentColor,
    alignItems: "flex-start",
  },
  bodyTest: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.accentColor,
  },
});

export default MyAccountScreen;
