import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Splash,
  Home,
  Add,
  Profile,
  Login,
  Register,
  GetStarted,
  DetailResep,
  ResepPerCategory,
  MyResep,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavigator from "../components/besar/BottomNavigator";
import EditNote from "../screens/EditNote";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="MyRecipes"
        component={MyResep}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNote}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailResep"
        component={DetailResep}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResepPerCategory"
        component={ResepPerCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyRecipes"
        component={MyResep}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
