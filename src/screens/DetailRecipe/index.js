import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Image, Text, HStack } from "@gluestack-ui/themed";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const DetailRecipe = ({ route }) => {
  const data = route.params;
  const [feed, setFeed] = useState([])
  const [name, setName] = useState()
  const [gambar, setGambar] = useState()
//   console.log(data);

    const fetchData = async () => {
        const url = 'https://yummly2.p.rapidapi.com/feeds/list?limit=24&start=0';
    
        try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '497cc0721amsh846b13cb1cbaf81p164131jsnc8bc9bdc32c5',
            'X-RapidAPI-Host': 'yummly2.p.rapidapi.com',
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data1 = await response.json();
        setFeed(data1);
        if (data1 && data1.feed && data1.feed.length > 0 && data1.feed[0].content && data1.feed[0].content.details) {
            const recipeName = data1.feed[0].content.details.name;
            console.log('Recipe Name:', recipeName);
            setName(recipeName)
          } else {
            console.log('Recipe details not found in the provided JSON.');
          }

          if (data1 && data1.feed && data1.feed.length > 0 && data1.feed[0].display) {
            const images = data1.feed[0].display.images;
          
            if (images && images.length > 0) {
              // Assuming you want to work with the first image in the array
              const firstImage = images[0];
              setGambar(firstImage)
          
              console.log(firstImage)
            } else {
              console.log('No images found in the "display" section.');
            }
          } else {
            console.log('Display details not found in the provided JSON.');
          }
        // console.log('data:', data1);
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


  return (
    <View style={{flex : 1, justifyContent : 'center', alignItems:'center'}}>
        {console.log('gambar'+gambar)}
        <Text>{name}</Text>
        <Image
            alt="image"
            style={{width : 50, height : 50}}
            source={{ uri : gambar }}
        />
    </View>
    // <View
    //   style={{
    //     alignItems: "center",
    //     flex: 1,
    //     paddingHorizontal: 8,
    //     paddingVertical: 15,
    //     backgroundColor: "white",
    //   }}
    // >
    //   <StatusBar hidden />
    //   <Image
    //     style={{ width: "100%", height: "30%" }}
    //     alt="image"
    //     source={{ uri: data.image }}
    //   />
    //   <Text
    //     mt={20}
    //     fontSize={30}
    //     fontWeight="bold"
    //     color="#038861"
    //     paddingTop={10}
    //   >
    //     {data.judul}
    //   </Text>
    //   <HStack mt={10} space="lg">
    //     <HStack
    //       bgColor="#FFD542"
    //       p={5}
    //       width={80}
    //       alignItems="center"
    //       rounded={20}
    //       justifyContent="center"
    //     >
    //       <Text fontSize={12}>
    //         <Ionicons name="time-outline" size={14} color="black" />{feed.feed}
    //       </Text>
    //     </HStack>
    //     <HStack
    //       bgColor="#FFD542"
    //       p={5}
    //       width={80}
    //       alignItems="center"
    //       rounded={20}
    //       justifyContent="center"
    //     >
    //       <Text fontSize={12}>
    //         <FontAwesome name="fire" size={14} color="black" /> 30 Min
    //       </Text>
    //     </HStack>
    //   </HStack>

    //   <View style={{ width: "100%", height: "60%" }}>
    //     <Text mt={15} alignItems="right" padding={20}></Text>
    //   </View>
    // </View>
  );
};

export default DetailRecipe;
