import { StatusBar, View } from 'react-native'
import React from 'react'
import { Box, Image, Text, HStack} from '@gluestack-ui/themed'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
const DetailRecipe = ({ route }) => {
    const data = route.params;
    console.log(data)
    return (
        // <SafeAreaView>
        //     <Box>
        //       <Text>Nama : {data.judul} </Text>
        //     </Box>
        //     <Box>
        //         <Text>Deskripsi : {data.isi}</Text>
        //     </Box>
        //     <Box>
        //         <Image alt='image' source={{uri : data.image}} />
        //     </Box>
        // </SafeAreaView>

        <View style={{alignItems : 'center', flex : 1, paddingHorizontal : 8, paddingVertical : 15, backgroundColor : "white"}}>
            <StatusBar hidden/>
           <Image
            style={{width : '100%', height : '30%'}}
            alt='image'
            source={{uri : data.image}}
           />
           <Text mt={20} fontSize={30} fontWeight="bold" color="#038861" paddingTop={10}>{data.judul}</Text>
            <HStack mt={10} space="lg">
              <HStack bgColor="#FFD542" p={5} width={80} alignItems="center" rounded={20} justifyContent="center" >

                <Text fontSize={12}><Ionicons name="time-outline" size={14} color="black" /> 30 Min</Text>
              </HStack>
              <HStack bgColor="#FFD542" p={5} width={80} alignItems="center" rounded={20} justifyContent="center" >

                <Text fontSize={12}><FontAwesome name="fire" size={14} color="black" /> 30 Min</Text>
              </HStack>
            </HStack>
           
           <View style={{width : '100%', height : '60%' }}>
                <Text mt ={15} alignItems='right' padding={20}>

                    
                </Text>
            </View> 
        </View>

    )
}

export default DetailRecipe