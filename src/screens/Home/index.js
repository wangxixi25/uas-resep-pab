import React, { useState, useEffect } from "react";
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const [userNotes, setUserNotes] = useState([
    {
      noteId: 1,
      image:
        "https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
      title: "Cream Soup",
      content: "A low-Calory cream soup with corn.asdasd das",
      category: "Work",
    },
    {
      noteId: 2,
      image:
        "https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
      title: "Note 2",
      content: "Lorem ipsum...",
      category: "Personal",
    },
    {
      noteId: 3,
      image:
        "https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
      title: "Note 3",
      content: "Lorem ipsum...",
      category: "Work",
    },
    {
      noteId: 4,
      image:
        "https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
      title: "Note 4",
      content: "Lorem ipsum...",
      category: "Study",
    },
    // Add more dummy notes as needed
  ]);
  const [category, setCategory] = useState(["Heavy meal", "Dessert", "Drinks"]); // Replace with your desired categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCategoryPress = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const filteredNotes = selectedCategory
    ? userNotes.filter((note) => note.category === selectedCategory)
    : userNotes;

  return (
    <SafeAreaView>
      <ScrollView bgColor="white">
        <Box px={20} flex={1} bgColor="white">
          <Heading mt={60} fontSize={30} fontWeight="bold" color="#038861">
            Let’s Find Your Food
          </Heading>

          <Input
            rounded={15}
            mt={20}
            size="xl"
            isDisabled={false}
            backgroundColor="#F5F5F5"
            isInvalid={false}
            isReadOnly={false}
            borderWidth={0}
          >
            <InputSlot>
              <InputIcon marginStart={15}>
                <AntDesign name="search1" size={20} color="#B1B3BC" />
              </InputIcon>
            </InputSlot>
            <InputField placeholder="What food for today..." />
          </Input>
          <Box marginTop={40}>
            <Image
              alt="cover"
              w={"100%"}
              height={200}
              rounded={20}
              source={{
                uri: "https://e0.pxfuel.com/wallpapers/52/830/desktop-wallpaper-food-background-food-food-recipes-food-menu-greek-food.jpg",
              }}
            />
          </Box>
          <Box mt={25}>
            <Text fontWeight="bold" fontSize={18} color="black">
              Categories
            </Text>

            <ScrollView
              horizontal
              mt={15}
              showsHorizontalScrollIndicator={false}
            >
              <HStack
                bgColor="#038861"
                space="md"
                p={14}
                rounded={15}
                marginEnd={10}
                height={55}
                width={150}
              >
                <Image source={require("../../assets/images/meal.png")} />
                <Text color="white">Heavy meal</Text>
              </HStack>
              <HStack
                bgColor="#038861"
                space="md"
                p={14}
                rounded={15}
                marginEnd={10}
                height={55}
                width={150}
              >
                <MaterialCommunityIcons
                  name="food-apple-outline"
                  size={22}
                  color="white"
                />
                <Text color="white">Dessert</Text>
              </HStack>
              <HStack
                bgColor="#038861"
                space="md"
                p={14}
                rounded={15}
                marginEnd={10}
                height={55}
                width={150}
              >
                <Entypo name="drink" size={22} color="white" />
                <Text color="white">Drinks</Text>
              </HStack>
            </ScrollView>
          </Box>
          <Box mt={25} marginBottom={100}>
            <Text fontWeight="bold" fontSize={18} color="black" mb={20}>
              Recommendation
            </Text>
            <MasonryList
              numColumns={1}
              data={filteredNotes}
              renderItem={({ item }) => (
                <ListNote
                  key={item.noteId}
                  judul={item.title}
                  image={item.image}
                  isi={item.content}
                  tanggal="tanggal"
                  status={item.status}
                  category={item.category}
                  noteId={item.noteId}
                />
              )}
              keyExtractor={(item) => item.noteId}
            />
          </Box>

          {/* <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <CategoryTab
            key={index}
            title={item}
            padding="$2"
            margin="$2"
            onPress={() => onCategoryPress(item)}
          />
        )}
        horizontal={true}
        mb={"$4"}
      /> */}
          {/* <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <ListNote
            key={item.noteId}
            judul={item.title}
            isi={item.content}
            tanggal="tanggal"
            status={item.status}
            category={item.category}
            noteId={item.noteId}
          />
        )}
        keyExtractor={(item) => item.noteId}
      /> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
