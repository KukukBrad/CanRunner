import { AsyncStorage } from "react-native";
export const CREATE_USER = "CREATE_USER";
export const SAVE_INFO = "SAVE_INFO";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const SAVE_PERSONAL_INFO = "SAVE_PERSONAL_INFO";
export const UPLOAD_USER = "UPLOAD_USER";
export const SIGN_IN = "SIGN_IN";

const saveDataToDevice = (user) => {
  AsyncStorage.setItem(
    "userPersonalData",
    JSON.stringify({
      user: user,
    })
  );
};

export const uploadUser = (newUser) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://canrunner.firebaseio.com/Users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUser,
        }),
      }
    );
    dispatch({
      type: UPLOAD_USER,
      userData: {
        newUser,
      },
    });

    const resData = await response.JSON;
    console.log(resData);
  };
};
