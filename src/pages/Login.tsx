import React, { useContext, useState } from "react";
import { Alert, Pressable, Text, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Container } from "../components/container";
import { Input } from "../components/input";
import { Spacer } from "../components/view";
import { createSessionId, getAccountId, getSessionToken, validateLogin } from "../network";
import { GlobalContext } from "../store";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPassword] = useState(true);
  const { handleUpdateSessionIdAccountId } = useContext(GlobalContext);

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      let validatedSessionId = "";
      let accountId = "";
      try {
        const token = await getSessionToken();
        // console.log("token", token);
        const validatedToken = await validateLogin(token, username, password);
        // console.log("validatedToken", validatedToken);
        validatedSessionId = await createSessionId(validatedToken);
        // console.log("validatedSessionId", validatedSessionId);
        accountId = await getAccountId(validatedSessionId);
        // console.log("accountId", accountId);
      } catch (error) {
        console.log("error", error);
      }

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
      <Input placeholder="username" value={username} onChangeText={handleUpdateUser} autoCapitalize={"none"} />
      <Spacer space={8} />
      <Input
        placeholder="password"
        value={password}
        onChangeText={handleUpdatePassword}
        secureTextEntry={showPass}
        onShowPassword={handleUpdateSeePassword}
        onShowValue={showPass}
        autoCapitalize={"none"}
      />
      {/* <GeneralButton label={"Log In"} onPress={handleLogin} textStyle={{ color: "white" }} /> */}
      <Pressable onPress={handleLogin} testID={"login-button"} style={{ marginTop: 40 }}>
        <Text style={{ color: "white" }}>{"login-button"}</Text>
      </Pressable>
    </Container>
  );
};
