import React, { Fragment, FunctionComponent } from "react";
import { Pressable, PressableProps, Text, TextStyle, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Spacer } from "./Spacer";

interface IGeneralButton {
  label: string;
  onPress: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
  props?: PressableProps & React.RefAttributes<View>;
}

export const GeneralButton: FunctionComponent<IGeneralButton> = ({ label, onPress, viewStyle, icon, textStyle }: IGeneralButton) => {
  const buttonStyle: ViewStyle = {
    padding: 8,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 24,
    minWidth: 280,
    flexDirection: "row",
    borderColor: "white",
    justifyContent: "center",
    ...viewStyle,
  };

  const labelStyle: TextStyle = {
    // color: "white",
    fontWeight: "400",
    fontSize: 18,
    ...textStyle,
  };

  return (
    <Pressable style={buttonStyle} onPress={onPress} testID={"login-button"}>
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
