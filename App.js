// App.js

import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router/index";
import { config } from "@gluestack-ui/config";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"), // Adjust the path
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"), // Adjust the path
  });

  if (!fontsLoaded) {
    // Font is still loading, return a loading indicator or null
    return null;
  }

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
