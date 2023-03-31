import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { PublicStack } from "./src/navigation/PublicStack";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "light";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: isDarkMode ? "red" : "green",
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
      </SafeAreaView>
      <PublicStack />
    </NavigationContainer>
  );
}
export default App;
