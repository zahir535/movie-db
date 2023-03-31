import React, { FunctionComponent } from "react";
import { ImageBackground, Text, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native";

interface IItemView {
  image: string;
  title: string;
}

export const ItemView: FunctionComponent<IItemView> = ({ image, title }: IItemView) => {
  const { height, width } = useWindowDimensions();

  const itemStyle: ViewStyle = {
    width: (4.2 / 10) * width,
    height: (2.5 / 10) * height,
    // backgroundColor: "lightgreen",
    marginHorizontal: 10,
    // margin: "auto",
    marginBottom: 24,
    borderRadius: 8,
    shadowOffset: {
      width: 8,
      height: -8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  };

  const titleStyle: TextStyle = {
    color: "white",
    fontWeight: "bold",
  };

  return (
    <ImageBackground source={require("../../dummyData/movie-cover.jpeg")} resizeMode={"cover"} style={itemStyle}>
      <View style={{ flex: 1, justifyContent: "flex-end", padding: 8, alignItems: "center" }}>
        <Text style={titleStyle}>{title !== "" && title !== undefined ? title : "no title"}</Text>
      </View>
    </ImageBackground>
  );
};
