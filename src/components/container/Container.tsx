import React, { FunctionComponent, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IContainer {
  children: ReactNode;
  style?: ViewStyle;
}

export const Container: FunctionComponent<IContainer> = ({ children, style }: IContainer) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: Colors.darker,
    padding: 8,
    ...style,
  };
  return <View style={containerStyle}>{children}</View>;
};
