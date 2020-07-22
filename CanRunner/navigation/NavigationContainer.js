import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";

import  LoginNavigation  from "./LoginNavigation";


const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Login'}));
    }
  }, [isAuth]);

  return <LoginNavigation ref={navRef} />
};

export default NavigationContainer;
