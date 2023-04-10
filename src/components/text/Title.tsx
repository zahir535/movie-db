import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Spacer } from "../view";

interface ITitle {
  label: string;
  subLabel_1?: string;
  subLabel_2?: string;
  overview?: string;
  labelIcon?: boolean;
  iconName?: string;
}

export const Title: FunctionComponent<ITitle> = ({ label, subLabel_1, subLabel_2, overview, labelIcon, iconName }: ITitle) => {
  const labelStyle: TextStyle = {
    fontSize: 38,
    fontWeight: "700",
    color: "white",
  };

  const subLabelStyle: TextStyle = {
    fontSize: 14,
    fontWeight: "200",
    color: "white",
  };

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
        {subLabel_1 !== undefined ? (
          <Fragment>
            <Text style={subLabelStyle}>{subLabel_1}</Text>
            <Spacer space={8} isHorizontal={true} />
          </Fragment>
        ) : null}
        {subLabel_2 !== undefined ? (
          <Fragment>
            <Icon name="chevron-right" size={12} color="white" />
            <Spacer space={8} isHorizontal={true} />
            <Text style={subLabelStyle}>"{subLabel_2}"</Text>
          </Fragment>
        ) : null}

        {labelIcon !== undefined && labelIcon === true ? (
          <Fragment>
            <Spacer space={8} isHorizontal={true} />
            <Icon name="chevron-right" size={12} color="white" />
            <Spacer space={8} isHorizontal={true} />
            <Icon name={iconName !== undefined ? iconName : "warning"} size={18} color="#EA5455" />
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
