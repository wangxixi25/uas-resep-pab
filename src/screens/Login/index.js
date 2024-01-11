import React, { useState } from "react";
import {
  Image,
  Box,
  Text,
  FormControl,
  Heading,
  Modal,
  ModalBackdrop,
  Alert,
  AlertText,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, Button } from "../../components";
import { loginUser } from "../../actions/AuthAction";
import { TouchableOpacity } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk pesan kesalahan

  const login = () => {
    if (email && password) {
      loginUser(email, password)
        .then((user) => {
          navigation.replace("MainApp");
        })
        .catch((error) => {
          // Menampilkan pesan kesalahan di bawah formulir
          setError("Login gagal. Periksa email dan password Anda.");
        });
    }
  };
  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center">
      <TouchableOpacity // Gunakan TouchableOpacity untuk aksi ketika diklik
        onPress={() => navigation.goBack()} // Arahkan ke layar sebelumnya saat diklik
        style={{
          top: 3, // Sesuaikan dengan posisi vertikal yang Anda inginkan
          left: 20, // Sesuaikan dengan posisi horizontal yang Anda inginkan
        }}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={25}
          color="black"
        />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/logohijau.png")}
        style={{
          alignSelf: "center",
          width: 150,
          height: 150,
          marginTop: 50,
        }}
        alt="Logohijau"
      />
      <Box marginTop={"$10"} marginHorizontal={"$6"} p={"$5"}>
        <Heading size="3xl" color="#038861">
          Welcome Back !
        </Heading>
        <Text size="sm" color="$black" my={"$1"}>
          We are happy to see you again. Let's go get you back in.
        </Text>
        <FormControl marginTop={20}>
          <Input
            label={"Email Address"}
            width={"$full"}
            height={"$10"}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Input
            label="Password"
            placeholder={"Masukkan E-mail"}
            width={"$full"}
            height={"$10"}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true} // This prop will hide the password characters
          />
        </FormControl>
        <Text size="sm" color="red" textAlign="center">
          {error} {/* Tampilkan pesan kesalahan di sini */}
        </Text>
        <Box flexDirection="column" my={"$5"}>
          <Button
            title="Login"
            type="text"
            width={"$full"}
            padding={"$1.5"}
            onPress={() => login()}
          />
        </Box>
      </Box>
      <Text size="sm" color="$black" my={"$1"} textAlign={"center"}>
        Log in to My account
      </Text>
      <Text size="sm" color="$black" textAlign={"center"}>
        Don't have an account?{" "}
        <Text
          fontWeight="bold"
          size="sm"
          color="#038861"
          onPress={() => navigation.navigate("Register")}
          mt="-0.5"
        >
          Sign Up
        </Text>
      </Text>
    </Box>
  );
};

export default Login;
