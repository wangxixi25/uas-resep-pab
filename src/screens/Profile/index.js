import React, { useState, useEffect } from "react";
import { Box, Text, Image, VStack, ScrollView } from "@gluestack-ui/themed";
import { Button } from "../../components";
import { clearStorage, getData } from "../../utils";
import FIREBASE from "../../config/FIREBASE";

const Profile = ({ navigation }) => {
	return (
		<Box
			mt={"$5"}
			mx={"$5"}
			backgroundColor="$blueGray100"
			flex={1}
			marginTop={"$20"}
			flexDirection="column">
			<ScrollView>
				<VStack backgroundColor="$blueGray100" width={"$full"} mb={"$0"}>
					<Image
						source={require("../../assets/images/avatar.png")}
						size="2xl"
						borderRadius={"$full"}
						alignSelf="center"
						alt="Foto Profil"
					/>
					<Text
						fontSize={"$xl"}
						alignSelf="center"
						marginTop={"$5"}
						fontWeight="$bold">
						Nama User
					</Text>
				</VStack>
				<Box
					flexDirection="column"
					bgColor="$white"
					shadowColor="$black"
					shadowOffset={{ width: 0, height: 2 }}
					shadowOpacity={"$25"}
					shadowRadius={"$3.5"}
					justifyContent="space-evenly"
					p={"$5"}
					borderRadius={"$xl"}>
					<Text color="$black" fontWeight="$bold" fontSize={"$xl"}>
						Data Diri
					</Text>
					<Box mt={"$5"}>
						<Text color="$black" fontSize={"$sm"}>
							Email
						</Text>
						<Text color="$black" fontSize={"$xl"} mt={"$2"}>
							Account name
						</Text>
					</Box>
					<Box mt={"$5"}>
						<Text color="$black" fontSize={"$sm"}>
							Nomor Ponsel
						</Text>
						<Text color="$black" fontSize={"$xl"} mt={"$2"}>
							082166864216
						</Text>
					</Box>
				</Box>
				<Button
					type="text"
					title={"Logout"}
					padding={"$3"}
					onPress={() => {
						navigation.navigate("Login");
					}}
				/>
			</ScrollView>
		</Box>
	);

};

export default Profile;
