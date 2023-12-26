import React from "react";
import {
  Text,
  Pressable,
  Box,
  VStack,
  HStack,
  Heading,
  Image
} from "@gluestack-ui/themed";
import { IconDelete, IconEdit } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const ListNote = ({
  judul,
  image,
  isi,
  tanggal,
  status,
  category,
  noteId,
  onDelete,
}) => {
  const navigation = useNavigation();

  const handleEditClick = () => {
    navigation.navigate("EditNote", {
      judul,
      image,
      isi,
      category,
      status,
      noteId,
    });
  };
  const handleDeleteClick = () => {
    onDelete(noteId);
    navigation.replace("MainApp");
  };

  return (
    <Box
      bgColor="#038861"
      padding={15}
      marginBottom={13}
      height={'auto'}
      rounded={10}
    >
      <HStack space="lg">
        <Image alt="cover" w={80} height={90} rounded={10} source={{ uri:  image  }} />
        <VStack>
          <Heading color="white">{judul}</Heading>
          <Box width={200}>
            <Text color="white" fontSize={10}>
              {isi}
            </Text>
          </Box>
          <HStack mt={10} space="lg">
            <HStack bgColor="#FFD542" p={5} width={80} alignItems="center" rounded={20} justifyContent="center" >

              <Text fontSize={12}><Ionicons name="time-outline" size={14} color="black" /> 30 Min</Text>
            </HStack>
            <HStack bgColor="#FFD542" p={5} width={80} alignItems="center" rounded={20} justifyContent="center" >
              
              <Text fontSize={12}><FontAwesome name="fire" size={14} color="black" /> 30 Min</Text>
            </HStack>
          </HStack>

          <Box
          >
            {/* <Text color="$white" fontWeight="$bold">
              {status}
            </Text> */}
          </Box>
        </VStack>
      </HStack>

      {/* <HStack>
        <Pressable onPress={handleEditClick}>
          <IconEdit />
        </Pressable>
        <Pressable onPress={handleDeleteClick}>
          <IconDelete />
        </Pressable>
      </HStack> */}
    </Box>
  );
};

export default ListNote;
