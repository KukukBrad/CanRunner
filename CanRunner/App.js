import React, { useState } from "react";
import { StyleSheet } from "react-native";
import ReduxThunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider, connect, useDispatch } from "react-redux";
import { useScreens, enableScreens } from "react-native-screens";

import NavigationContainer from "./navigation/NavigationContainer";

import createUserReducer from "./store/reducers/createUserReducer";
import authReducer from "./store/reducers/authReducer";
import routesReducer from "./store/reducers/routesReducer";
import {auth} from 'firebase'

var firebase = require('firebase')



enableScreens();

const rootReducer = combineReducers({
  createUser: createUserReducer,
  auth: authReducer,
  routes: routesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const firebaseConfig = {
  apiKey: "AIzaSyDjDyeF6pk3B83vpSxvpBUAJXdSumjVzXs",
  authDomain: "canrunner.firebaseapp.com",
  databaseURL: "https://canrunner.firebaseio.com",
  projectId: "canrunner",
  storageBucket: "canrunner.appspot.com",
  messagingSenderId: "843398182572",
  appId: "1:843398182572:web:40818d7812f86f877d9109",
  measurementId: "G-7P7XZW2YSQ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}
