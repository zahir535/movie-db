import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Spacer } from "./Spacer";

interface IGeneralButton {
  label: string;
  onPress: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export const GeneralButton: FunctionComponent<IGeneralButton> = ({ label, onPress, viewStyle, icon, textStyle }: IGeneralButton) => {
  const buttonStyle: ViewStyle = {
    padding: 8,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 24,
    flexDirection: "row",
    ...viewStyle,
  };

  const labelStyle: TextStyle = {
    color: "black",
    ...textStyle,
  };

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={labelStyle}>{label}</Text>
      {icon !== undefined ? (
        <Fragment>
          <Spacer space={8} isHorizontal={true} />
          <Icon name={icon} size={28} color="black" style={{ opacity: 0.6 }} />
        </Fragment>
      ) : null}
    </Pressable>
  );
};
