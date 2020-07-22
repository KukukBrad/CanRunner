import { Alert } from "react-native";
import { AsyncStorage } from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;
var firebase = require('firebase');

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogOutTime(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjDyeF6pk3B83vpSxvpBUAJXdSumjVzXs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      Alert.alert(
        "Error!",
        "Error Code: " + errorResData.error.message,
        null,
        null
      );
    }

    let resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationTokenDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToDevice(resData.token, resData.loaclId, expirationTokenDate, resData.email);
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjDyeF6pk3B83vpSxvpBUAJXdSumjVzXs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      Alert.alert(
        "Error!",
        "Error Code: " + errorResData.error.message,
        null,
        null
      );
    }

    let resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationTokenDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToDevice(resData.idToken, resData.localId, expirationTokenDate, resData.email);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogOutTime = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime + 3600);
  };
};

const saveDataToDevice = (token, userId, expirationTokenDate, email) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiresIn: expirationTokenDate.toISOString(),
      email: email
    })
  );
};

