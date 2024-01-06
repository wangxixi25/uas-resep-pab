import React, { useState } from "react";
import {
  Image,
  Box,
  Alert,
  FormControl,
  Text,
  Modal,
  ModalBackdrop,
  AlertText,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, Button } from "../../components";
import { registerUser } from "../../actions/AuthAction";
import { TouchableOpacity } from "react-native";

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const onRegister = async () => {
    if (nama && email && password) {
      const data = {
        nama: nama,
        email: email,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("MainApp");
      } catch (error) {
        console.log("Error", error.message);
        toggleAlert(error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
      toggleAlert("Data tidak lengkap");
    }
  };

  return (
    <Box flex={1} backgroundColor="white" justifyContent="center">
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
        <Text size="3xl" color="#038861" fontWeight="bold">
          Create an Account
        </Text>
        <Text size="sm" color="$black" my={"$1"}>
          Sign up to continue!
        </Text>
        <FormControl>
          <Input
            label="Nama"
            value={nama}
            onChangeText={(nama) => setNama(nama)}
            height={"$10"}
          />
          <Input
            label="Email Address"
            value={email}
            onChangeText={(email) => setEmail(email)}
            height={"$10"}
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
            height={"$10"}
          />
        </FormControl>
        <Box flexDirection="column" my={"$5"}>
          <Button
            color="#038861"
            title="Register"
            type="text"
            icon="submit"
            padding={"$3"}
            fontSize={"$md"}
            onPress={() => {
              onRegister();
            }}
          />
        </Box>
      </Box>
      {showAlert && (
        <Modal isOpen={showAlert} onClose={() => toggleAlert()}>
          <ModalBackdrop />
          <Alert mx="$4" action="error" variant="solid">
            <AlertText fontWeight="$bold">Error!</AlertText>
            <AlertText>{alertMessage}</AlertText>
          </Alert>
        </Modal>
      )}
    </Box>
  );
};

export default Register;
