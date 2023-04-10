import React, { useState } from "react";
import { Alert, Text, ViewStyle } from "react-native";

import { Container } from "../components/container";
import { Input } from "../components/input";
import { GeneralButton } from "../components/view";
import { createSessionId } from "../network";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const loginResponse = await createSessionId();

    if (loginResponse.error === undefined) {
      if (username !== "" && password !== "") {
        navigation.navigate("Private");
      } else {
        Alert.alert("Invalid credentials");
      }
    } else {
      Alert.alert(loginResponse.error.errorMessage);
    }
  };

  const updatedContainerStyle: ViewStyle = {
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
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

  return (
    <Container style={updatedContainerStyle}>
      <Input placeholder="username" value={username} onChangeText={handleUpdateUser} />
      <Input placeholder="password" value={password} onChangeText={handleUpdatePassword} secureTextEntry={showPass} />
      <Text onPress={handleUpdateSeePassword}>{showPass !== true ? "see password" : "hide password"}</Text>
      <GeneralButton label={"Log In"} onPress={handleLogin} />
    </Container>
  );
};
