import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Spacer } from "../view";

interface IRating {
  label: string | number;
  iconName: string;
  iconColor?: string;
}

export const Rating: FunctionComponent<IRating> = ({ label, iconName = "star", iconColor = "#F7C04A" }: IRating) => {
  const ratingStyleContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 8,
  };
  return (
    <View style={ratingStyleContainer}>
      <Text style={{ fontWeight: "700" }}>{label}</Text>
      <Spacer space={4} isHorizontal={true} />
      <Icon name={iconName} size={24} color={iconColor} />
    </View>
  );
};
