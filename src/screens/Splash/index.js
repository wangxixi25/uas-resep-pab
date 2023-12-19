import React, { useEffect } from "react";
import { ScrollView, ImageBackground, Image } from "react-native";
import { useTheme, Box } from "@gluestack-ui/themed"; // Import Gluestack UI components

const Splash = ({ navigation }) => {
  const theme = useTheme(); // Access the theme

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("GetStarted"); // Gantilah "Login" dengan rute yang diinginkan
    }, 3000); // Waktu tunda dalam milidetik (3000 milidetik = 3 detik)

    // Membersihkan timeout jika komponen di-unmount sebelum waktu tunda berakhir
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Box flex={1} bg="primary">
      <ImageBackground
        source={require("../../assets/images/Start.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Box alignItems="center">
            {/* Box for the logo */}
            <Box>
              <Image
                source={require("../../assets/icons/DietDelight.png")}
                style={{ width: 300, height: 300, marginBottom: 10 }}
              />
            </Box>
          </Box>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default Splash;
