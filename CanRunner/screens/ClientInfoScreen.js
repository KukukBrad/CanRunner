import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import InfoCard from "../components/InfoCard";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const ClientInfoScreen = (props) => {
  return (
    <View style={styles.screen}>
      <InfoCard style={{ flex: 1 }}>
        <Image
          source={require("../assets/HouseIcon.png")}
          style={styles.imageStyle}
        />
        <InfoCard>
          <Text style={styles.title}> Address </Text>
          <Text style={styles.textStyle}>
            {" "}
            868 E Libra Pl. Chandler AZ, 85249{" "}
          </Text>

          <Text style={styles.title}> Job Details: </Text>
          <Text style={styles.jobStyle} color="red">
            Take out Trash & Recycle{" "}
          </Text>

          <Text style={styles.title}> Notes: </Text>
          <Text style={styles.textStyle}>
            {" "}
            Both Cans are on the left side of the house, dog will bark but
            friendly{" "}
          </Text>
          <View style={styles.NavButton}>
            <Button title="Start Navigation" color="white" />
          </View>
          <View style={styles.CompleteButton}>
            <Button title="Mark as Complete" color="white" />
          </View>
        </InfoCard>
      </InfoCard>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  imageStyle: {
    width: "90%",
    height: "40%",
    marginTop: 10,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 2,
  },

  title: {
    fontSize: 24,
    justifyContent: "center",
    alignItems: "flex-start",
    textDecorationLine: "underline",
    marginBottom: 5,
  },

  textStyle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  jobStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },

  NavButton: {
    backgroundColor: "#348BC3",
    alignContent: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 10,
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
  },

  CompleteButton: {
    backgroundColor: "green",
    alignContent: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 10,
    width: "80%",
    marginLeft: 40,
    marginTop: 20,
  },
});

export default ClientInfoScreen;
