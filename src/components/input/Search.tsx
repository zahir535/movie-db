import React, { Fragment, FunctionComponent, useState } from "react";
import { Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
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
  placeholder,
  style,
  testID,
  value,
  viewStyle,
  ...props
}: ISearch) => {
  const inputStyle: TextStyle = {
    // flex: 1,
    color: Colors.darker,
    fontSize: 16,
    height: 40, // height is more than the input view size to adjust the keyboard avoiding view
    backgroundColor: Colors.lighter,
    width: 200,
    borderWidth: 1,
    paddingHorizontal: 8,
    // marginTop: 16,
    borderRadius: 4,
    marginLeft: 16,
    ...viewStyle,
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text onPress={onPress} style={{ color: "white" }}>
        Search
      </Text>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightgreen}
        // selectionColor={Colors.darker}
        spellCheck={false}
        style={inputStyle}
        value={value}
        {...props}
      />
    </View>
  );
};
