import React, { useContext, useState } from "react";
import { Alert, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Container } from "../components/container";
import { Input } from "../components/input";
import { GeneralButton, Spacer } from "../components/view";
import { createSessionId, getAccountId, getSessionToken, validateLogin } from "../network";
import { GlobalContext } from "../store";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(true);
  const { handleUpdateSessionIdAccountId } = useContext(GlobalContext);

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const token = await getSessionToken();
      const validatedToken = await validateLogin(token, username, password);
      const validatedSessionId = await createSessionId(validatedToken);
      const accountId = await getAccountId(validatedSessionId);

      // save to context
      await handleUpdateSessionIdAccountId(validatedSessionId, accountId);
      setUsername("");
      setPassword("");
      setShowPassword(true);
      navigation.navigate("Private");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  const handleUpdateSeePassword = () => {
    setShowPassword(!showPass);
  };

  const handleUpdateUser = (value: string) => {
    setUsername(value);
  };

  const handleUpdatePassword = (value: string) => {
    setPassword(value);
  };

  const updatedContainerStyle: ViewStyle = {
    backgroundColor: Colors.darker,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container style={updatedContainerStyle}>
      <Input placeholder="username" value={username} onChangeText={handleUpdateUser} />
      <Spacer space={8} />
      <Input
        placeholder="password"
        value={password}
        onChangeText={handleUpdatePassword}
        secureTextEntry={showPass}
        onShowPassword={handleUpdateSeePassword}
        onShowValue={showPass}
      />
      <GeneralButton label={"Log In"} onPress={handleLogin} textStyle={{ color: "white" }} />
    </Container>
  );
};
