import React, { useState } from "react";
import { Alert, ViewStyle } from "react-native";

import { Container } from "../components/container";
import { Input } from "../components/input";
import { GeneralButton } from "../components/view";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username !== "" && password !== "") {
      navigation.navigate("Private");
    } else {
      Alert.alert("Invalid credentials");
    }
  };

  const updatedContainerStyle: ViewStyle = {
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container style={updatedContainerStyle}>
      <Input placeholder="username" value={username} onChangeText={setUsername} />
      <Input placeholder="password" value={password} onChangeText={setPassword} />
      <GeneralButton label={"Log In"} onPress={handleLogin} />
    </Container>
  );
};
