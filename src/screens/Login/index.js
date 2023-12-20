import React, { useState } from "react";
import {
  Alert,
  Box,
  Text,
  FormControl,
  Heading,
  AlertText,
  Modal,
  ModalBackdrop,
} from "@gluestack-ui/themed";
import { Input, Button } from "../../components";

const Login = ({ navigation }) => {
  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center">
      <Box
        shadowColor="white"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={"$25"}
        shadowRadius={"$3.5"}
        elevation={"$5"}
        backgroundColor="$white"
        borderRadius={"$md"}
        marginTop={"$10"}
        marginHorizontal={"$6"}
        p={"$5"}
      >
        <Heading size="3xl" color="#038861">
          Welcome Back !
        </Heading>
        <Text size="sm" color="$black" my={"$1"}>
          We are happy to see you again. Let's go get you back in
        </Text>
        <FormControl>
          <Input
            label={"Email Address"}
            width={"$full"}
            height={"$10"}
            onChangeText={() => {}} // Set email ke dalam state
            value={null}
          />
          <Input
            label="Password"
            width={"$full"}
            height={"$10"}
            secureTextEntry={true}
            onChangeText={() => {}} // Set password ke dalam state
            value={null}
          />
        </FormControl>
        <Box flexDirection="column" my={"$5"}>
          <Button
            title="Login"
            type="text"
            width={"$full"}
            padding={"$3"}
            onPress={() => {
              navigation.navigate("MainApp");
            }}

          />
          {/* <Text size="sm" color="$black" mt={"$4"}>
            Don't have an account?
          </Text> */}
          {/* <Button
            title="Register"
            type="text"
            padding={"$3"}
            onPress={() => {
              navigation.navigate("Register");
            }}
          /> */}

        </Box>
      </Box>
      {/* <Heading size="3xl" color="#038861">
          Welcome Back !
        </Heading> */}
        <Text size="sm" color="$black" my={"$1"} textAlign={"center"}>
          Log in to My account
          
        </Text>
        <Text size="sm" color="$black" my={"$1"} textAlign={"center"}>
          Don't have an account ? Sign Up
          {/* <text color="$red"> Sign Up</text> */}
         
          
        </Text>
    </Box>
    
  );
};

export default Login;
