import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import Modal from "react-native-modal";

import RouteCard from "../components/RouteCard";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import * as routeActions from "../store/actions/routes";

const ListViewScreens = (props) => {
  const [modalVisable, setModalVisable] = useState(false);
  return (
    <FlatList onRefresh={() => {routeActions.updateForRoutes()}}>
      <View style={styles.screen}>
        <Text style={styles.address}>
          No Locations were assigned to your account.{" "}
        </Text>
      </View>
    </FlatList>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  address: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListViewScreens;
