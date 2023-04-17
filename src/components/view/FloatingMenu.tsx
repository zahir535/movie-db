import React, { Fragment, ReactNode } from "react";
import { Button as RNButton, StyleProp, View, ViewStyle } from "react-native";
import { Menu, MenuDivider, MenuItem, Position } from "react-native-enhanced-popup-menu";

interface ElementToStickProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ElementToStick = React.forwardRef<View, ElementToStickProps>(({ children }, ref) => {
  return <View ref={ref}>{children}</View>;
});

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const Button = ({ title, style, onPress }: ButtonProps) => {
  return (
    <View style={style}>
      <RNButton title={title} onPress={onPress} />
    </View>
  );
};

interface IFloatingMenu {
  children: ReactNode;
  menuItem: IMenuItem[];
}

export const FloatingMenu = ({ children, menuItem }: IFloatingMenu) => {
  let elementRef = React.createRef<View>();
  let menuRef: Menu | null = null;

  const setMenuRef: (instance: Menu | null) => void = (ref) => (menuRef = ref);
  const hideMenu = () => menuRef?.hide();
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.TOP_LEFT);
  };

  const onPress = () => showMenu();

  return (
    <Fragment>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ElementToStick ref={elementRef}>{children}</ElementToStick>
        <Button style={{ position: "absolute", bottom: 64 }} title={"Press to show menu"} onPress={onPress} />
        <Menu ref={setMenuRef}>
          {menuItem.map((item, index) => {
            const { title, onPress } = item;
            return (
              <Fragment>
                {title === "Log Out txt" ? <MenuDivider /> : null}
                <MenuItem key={index} onPress={onPress}>
                  {title}
                </MenuItem>
              </Fragment>
            );
          })}
        </Menu>
      </View>
    </Fragment>
  );
};
