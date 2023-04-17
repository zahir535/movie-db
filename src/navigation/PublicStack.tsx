import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment } from "react";

import { Login } from "../pages";
import { PrivateStack } from "./PrivateStack";

const { Screen, Navigator } = createStackNavigator();

export const PublicStack = () => {
  const defaultOptions = { animationEnabled: false };
  return (
    <Fragment>
      <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} options={defaultOptions} />
        <Screen name="Private" component={PrivateStack} options={defaultOptions} />
      </Navigator>
    </Fragment>
  );
};
