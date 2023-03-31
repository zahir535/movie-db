import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment } from "react";

import { Dashboard } from "../pages";

const { Screen, Navigator } = createStackNavigator();

export const PrivateStack = () => {
  const defaultOptions = { animationEnabled: false };
  return (
    <Fragment>
      <Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Screen name="Dashboard" component={Dashboard} options={defaultOptions} />
      </Navigator>
    </Fragment>
  );
};
