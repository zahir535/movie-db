import React, { Fragment, FunctionComponent, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IInput extends TextInputProps {
  viewStyle?: ViewStyle;
  onShowValue?: boolean;
  onShowPassword?: () => void;
}

export const Input: FunctionComponent<IInput> = ({
  onBlur,
  onFocus,
  onLayout,
  onShowPassword,
  onShowValue,
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
    // marginLeft: 16,
    ...viewStyle,
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", ...inputStyle }}>
        <TextInput
          autoCorrect={false}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightgreen}
          // selectionColor={Colors.darker}
          spellCheck={false}
          style={inputTextStyle}
          value={value}
          // selectionColor={Colors.darker}
          {...props}
        />
        {onShowPassword !== undefined && onShowValue !== undefined ? (
          <Fragment>
            <Pressable onPress={onShowPassword}>
              <Icon name={onShowValue ? "eye-with-line" : "eye"} size={24} />
            </Pressable>
          </Fragment>
        ) : null}
      </View>
    </View>
  );
};
