import React, { useState } from "react";
import {
  ScrollView,
  Image,
  Box,
  FormControl,
  Text,
  Modal,
  ModalBackdrop,
  ModalContent,
  View,
} from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input, Button } from "../../components";
import { registerUser } from "../../actions/AuthAction";
import { TouchableOpacity } from "react-native";

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isDataIncomplete, setIsDataIncomplete] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State untuk pesan kesalahan kata sandi
  const [registerError, setRegisterError] = useState(""); // State baru untuk pesan kesalahan

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("The email address is badly formatted.");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const onRegister = async () => {
    if (
      nama &&
      email &&
      password &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      const data = {
        nama: nama,
        email: email,
        status: "user",
      };

      try {
        const user = await registerUser(data, password);
        setRegistrationSuccess(true);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setRegisterError(
            "The email address is already in use by another account."
          );
        } else {
          setRegisterError("An error occurred during registration.");
        }
      }
    } else {
      setIsDataIncomplete(true);
    }
  };

  return (
    <ScrollView backgroundColor="white">
      <Box flex={1} backgroundColor="white" justifyContent="center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            top: 50,
            left: 20,
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
              onChangeText={(email) => {
                setEmail(email);
                setEmailError("");
              }}
              height={"$10"}
            />
            {emailError && (
              <Text size="sm" color="red" textAlign="center">
                {emailError}
              </Text>
            )}
            <Input
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={(password) => setPassword(password)}
              height={"$10"}
            />
            {passwordError && (
              <Text size="sm" color="red">
                {passwordError}
              </Text>
            )}
          </FormControl>
          {isDataIncomplete && (
            <Text
              size="lg"
              color="red"
              textAlign="center"
              fontWeight="bold"
              marginTop={20}
            >
              Data tidak lengkap.
            </Text>
          )}
          {registerError !== "" && (
            <Text
              style={{ color: "red", textAlign: "center", marginVertical: 10 }}
            >
              {registerError}
            </Text>
          )}
          {registrationSuccess && (
            <Modal
              isOpen={registrationSuccess}
              onClose={() => setRegistrationSuccess(false)}
            >
              <ModalBackdrop />
              <ModalContent
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "green",
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  Anda berhasil membuat akun. Silahkan login terlebih dahulu.
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    width: 100, // Atau tetapkan lebar spesifik jika diinginkan
                  }}
                >
                  <Button
                    title="Login"
                    onPress={() => {
                      setRegistrationSuccess(false);
                      navigation.replace("Login");
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  ></Button>
                </View>
              </ModalContent>
            </Modal>
          )}
          <Box flexDirection="column" my={"$5"}>
            <Button
              color="#038861"
              title="Register"
              type="text"
              icon="submit"
              padding={"$1.5"}
              fontSize={"$md"}
              onPress={() => {
                onRegister();
              }}
            />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Register;
