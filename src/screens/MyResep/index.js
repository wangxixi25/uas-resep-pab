import React, { useState, useEffect } from "react";
import { Box, FlatList, Heading, ScrollView } from "@gluestack-ui/themed";
import { CategoryTab, ListReceipe } from "../../components";
import { getNote } from "../../actions/AuthAction";
import { Button } from "react-native";

const MyResep = ({ navigation }) => {
  const [userNotes, setUserNotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = Array.from(new Set(categories));
      setUserNotes(notes);
      setCategory(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onCategoryPress = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const filteredNotes = selectedCategory
    ? userNotes.filter((note) => note.category === selectedCategory)
    : userNotes;

  return (
    <ScrollView backgroundColor="white">
      <Box py="$3" px="$2" marginTop="$10" backgroundColor="white">
        <Heading mt={60} fontSize={30} fontWeight="bold" color="#038861">
          Let’s Find Your Food
        </Heading>
        <Button
          title="Add New Recipe"
          onPress={() => {
            navigation.navigate("Add"); // Sesuaikan dengan nama route yang benar
          }}
        />
        <FlatList
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
        />
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <ListReceipe
              // image={item.imageUrl} // Gunakan imageUrl dari data resep
              key={item.noteId}
              judul={item.title}
              isi={item.content}
              status={item.status}
              category={item.category}
              noteId={item.noteId}
            />
          )}
          keyExtractor={(item) => item.noteId}
        />
      </Box>
    </ScrollView>
  );
};

export default MyResep;
