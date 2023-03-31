import React, { Fragment, FunctionComponent, useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IInput extends TextInputProps {
  viewStyle?: ViewStyle;
}

export const Input: FunctionComponent<IInput> = ({
  onBlur,
  onFocus,
  onLayout,
  placeholder,
  style,
  testID,
  value,
  viewStyle,
  ...props
}: IInput) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(event);
    }
    setIsFocused(false);
  };

  const handleClear = () => {
    if (props.onChangeText !== undefined) {
      props.onChangeText("");
    }
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) {
      onFocus(event);
    }
    setIsFocused(true);
  };

  const inputStyle: TextStyle = {
    // flex: 1,
    color: Colors.darker,
    fontSize: 16,
    height: isFocused ? 42 : 40, // height is more than the input view size to adjust the keyboard avoiding view
    backgroundColor: Colors.lighter,
    width: 200,
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 16,
    borderRadius: 4,
    ...viewStyle,
  };

  return (
    <View>
      <TextInput
        autoCorrect={false}
        onBlur={handleBlur}
        onFocus={handleFocus}
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
