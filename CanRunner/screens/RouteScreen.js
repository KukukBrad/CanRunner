import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Keyboard,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import Colors from "../constants/Colors";
import Modal from "react-native-modal";
import { TextInput } from "react-native-gesture-handler";

import MapViewDirections from "react-native-maps-directions";

const RouteScreen = (props) => {
  const [modalVisable, setModalVisable] = useState(false);
  const origin = { latitude: 33.5028, longitude: -111.9293 };
  const destination = { latitude: 33.3015, longitude: -111.8985 };
  const park1 = { latitude: 33.3575, longitude: -111.9087 };
  const park2 = { latitude: 33.3519918, longitude: -111.9206978 };
  const park3 = { latitude: 33.39, longitude: -111.8774 };

  const parks = [park1, park2, park3];

  const GOOGLE_MAPS_APIKEY = "AIzaSyDjDyeF6pk3B83vpSxvpBUAJXdSumjVzXs";
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  /*   onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10,
      },
    });
  };

  onError = (errorMessage) => {
    console.log(errorMessage); // eslint-disable-line no-console
  };

  setDistance = (distance, duration_in_traffic) => {
    // console.log('setDistance');
    this.setState({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic),
    });
  }; */
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 111.9293,
          longitude: 33.5028,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: 33.5028,
            longitude: -111.9293,
          }}
          pinColor="green"
          title={"Starting Location "}
          description={"Scottsdale Fashion Square Mall"}
        />
        <MapView.Marker
          coordinate={{
            latitude: 33.3015,
            longitude: -111.8985,
          }}
          pinColor="red"
          title={"End Location"}
          description={"Chandler Mall"}
        />
        <MapView.Marker
          coordinate={{
            latitude: 33.3519918,
            longitude: -111.9206978,
          }}
          pinColor="teal"
          title={"Papago Park"}
        />

        <MapView.Marker
          coordinate={{
            latitude: 33.3575,
            longitude: -111.9087,
          }}
          pinColor="teal"
          title={" Shroud Park"}
        />

        <MapView.Marker
          coordinate={{
            latitude: 33.39,
            longitude: -111.8774,
          }}
          pinColor="teal"
          title={" Banner Medical Center"}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="blue"
          waypoints={parks}
          optimizeWaypoints={true}
          mode="DRIVING"
          splitWaypoints={true}
          directionsServiceBaseUrl={
            "https://maps.googleapis.com/maps/api/directions/json"
          }
          precision="high"
          region="US"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <Button
            color="white"
            title="List View"
            onPress={() => {
              props.navigation.navigate("ListView");
            }}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Report Problem"
            color="red"
            onPress={() => {
              setModalVisable(true);
            }}
          />
        </View>
      </View>

      <Modal isVisible={modalVisable} style={styles.modalStyle}>
        <View style={styles.modalHeaderStyle}>
          <Text style={styles.modalHeaderText}>
            {" "}
            Please Report your Problem
          </Text>
        </View>

        <View style={styles.modalTextInput}>
          <TextInput
            placeholder=" What is the Problem? "
            textAlignVertical="top"
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
        </View>

        <View style={styles.modalButtonContainer}>
          <View style={styles.buttonStyle}>
            <Button
              title="Report Problem"
              color="red"
              onPress={() => {
                setModalVisable(false);
              }}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Exit"
              color="white"
              onPress={() => {
                setModalVisable(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },

  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    borderRightColor: "white",
    borderLeftColor: "white",
    borderRightWidth: 0.5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalStyle: {
    flex: 0.6,
    backgroundColor: "white",
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 200,
  },

  modalHeaderStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },

  modalHeaderText: {
    fontSize: 22,
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "bold",
  },

  modalTextInput: {
    height: "50%",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    alignContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  modalButtonContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default RouteScreen;
