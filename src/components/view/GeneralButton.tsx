import React, { FunctionComponent } from "react";
import { Pressable, Text, ViewStyle } from "react-native";

interface IGeneralButton {
  label: string;
  onPress: () => void;
}

export const GeneralButton: FunctionComponent<IGeneralButton> = ({ label, onPress }: IGeneralButton) => {
  const buttonStyle: ViewStyle = {
    padding: 8,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 24,
  };

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
};
