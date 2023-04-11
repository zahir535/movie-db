import React, { useContext, useState } from "react";
import { Alert, Text, ViewStyle } from "react-native";

import { Container } from "../components/container";
import { Input } from "../components/input";
import { GeneralButton } from "../components/view";
import { createSessionId, getAccountId, getSessionToken, validateLogin } from "../network";
import { GlobalContext } from "../store";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(false);
  const { handleUpdateSessionIdAccountId } = useContext(GlobalContext);

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const token = await getSessionToken();
      const validatedToken = await validateLogin(token);
      const validatedSessionId = await createSessionId(validatedToken);
      const accountId = await getAccountId(validatedSessionId);
      // console.log("handleLogin", { token: token, validatedToken: validatedToken, validatedSessionId: validatedSessionId });

      // save to context
      await handleUpdateSessionIdAccountId(validatedSessionId, accountId);
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
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container style={updatedContainerStyle}>
      <Input placeholder="username" value={username} onChangeText={handleUpdateUser} />
      <Input placeholder="password" value={password} onChangeText={handleUpdatePassword} secureTextEntry={showPass} />
      <Text onPress={handleUpdateSeePassword}>{showPass !== true ? "see password" : "hide password"}</Text>
      <GeneralButton label={"Log In"} onPress={handleLogin} />
    </Container>
  );
};
