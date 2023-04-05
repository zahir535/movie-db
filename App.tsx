import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { PublicStack } from "./src/navigation/PublicStack";
import { MovieProvider } from "./src/store/MovieProvider";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "light";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: isDarkMode ? "red" : "green",
  };

  return (
    <MovieProvider>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
        </SafeAreaView>
        <PublicStack />
      </NavigationContainer>
    </MovieProvider>
  );
}
export default App;
