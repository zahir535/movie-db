import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ISearch extends TextInputProps {
  onPress: () => void;
  viewStyle?: ViewStyle;
}

export const Search: FunctionComponent<ISearch> = ({
  onBlur,
  onFocus,
  onLayout,
  onPress,
  placeholder = "movie name",
  style,
  testID,
  value,
  viewStyle,
  ...props
}: ISearch) => {
  const inputTextStyle: TextStyle = {
    color: Colors.darker,
    fontSize: 16,
    // backgroundColor: "lightgreen",
    flex: 1,
  };
  const inputStyle: TextStyle = {
    color: Colors.darker,
    fontSize: 16,
    height: 40, // height is more than the input view size to adjust the keyboard avoiding view
    backgroundColor: Colors.lighter,
    width: 200,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 16,
    ...viewStyle,
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", ...inputStyle }}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightgreen}
        // selectionColor={Colors.darker}
        spellCheck={false}
        style={inputTextStyle}
        value={value}
        testID={"TextInput-dashboard"}
        {...props}
      />
      <Pressable onPress={onPress} testID={"Pressable-magnifying-glass"}>
        <Icon name="magnifying-glass" size={30} />
      </Pressable>
    </View>
  );
};
