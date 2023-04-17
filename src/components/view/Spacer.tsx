import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

interface ISpacer {
  space: number;
  isHorizontal?: boolean;
}

export const Spacer: FunctionComponent<ISpacer> = ({ space, isHorizontal }: ISpacer) => {
  const spacerStyle: ViewStyle =
    isHorizontal !== undefined && isHorizontal === true
      ? {
          width: space,
          // backgroundColor: "lightgreen",
        }
      : {
          height: space,
          // backgroundColor: "lightgreen",
        };

  return <View style={spacerStyle} />;
};
