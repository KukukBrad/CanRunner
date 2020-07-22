import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";

import Colors from "../constants/Colors";
import RoutesScreen from "../screens/RouteScreen";
import ClientInfoScreen from "../screens/ClientInfoScreen";
import ListViewScreen from "../screens/ListViewScreen";
import AddressScreen from "../screens/AddressScreen";
import BankingScreen from "../screens/BankingScreen";
import EarningsScreen from "../screens/EarningsScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import StartUpScreen from "../screens/StartUpScreen";

const LoginNavigation = createStackNavigator(

  {
    Login: {
      screen: LoginScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    Routes: {
      screen: RoutesScreen,
    },
    Info: {
      screen: ClientInfoScreen,
    },
    ListView: {
      screen: ListViewScreen,
    },
    Address: {
      screen: AddressScreen,
    },
    Banking: {
      screen: BankingScreen,
    },
    Earning: {
      screen: EarningsScreen,
    },
    Feedback: {
      screen: FeedbackScreen,
    },
    MyAccount: {
      screen: MyAccountScreen,
    },
    PersonalInfo: {
      screen: PersonalInfoScreen,
    },
    StartUp: {
      screen: StartUpScreen,
    }
  },
  {
    initialRouteName: "StartUp",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
      headerTitle: " "
    },
  }
);

export default createAppContainer(LoginNavigation);
