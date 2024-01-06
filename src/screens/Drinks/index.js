import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements'

const Drinks = ({navigation}) => {
    const [userNotes, setUserNotes] = useState([
        {
          noteId: 1,
          image: 'https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg',
          title: "Cream Soup",
          content: "A low-Calory cream soup with corn.asdasd das",
          category: "Work",
        },
        {
          noteId: 2,
          image: 'https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg',
          title: "Note 2",
          content: "Lorem ipsum...",
          category: "Personal",
        },
        {
          noteId: 3,
          image: 'https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg',
          title: "Note 3",
          content: "Lorem ipsum...",
          status: "Active",
          category: "Work",
        },
        {
          noteId: 4,
          image: 'https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg',
          title: "Note 4",
          content: "Lorem ipsum...",
          status: "Active",
          category: "Study",
        },
        
    ]);

    return (
        <SafeAreaView>
            <ScrollView bgColor="white">
                <Box px={20} flex={1} bgColor="white">
                    <Heading mt={60} fontSize={30} fontWeight="bold" color="#038861">
                        <Ionicons name="fast-food-outline" size={30} color="white" /> Dessert!
                    </Heading>
            
                    <Input rounded={15} mt={20} size="xl" isDisabled={false} backgroundColor="#F5F5F5" isInvalid={false} isReadOnly={false} borderWidth={0} >
                        <InputSlot>
                        <InputIcon marginStart={15}><AntDesign name="search1" size={20} color="#B1B3BC" /></InputIcon>
                        </InputSlot>
                        <InputField
                        placeholder='What food for today...'
                        />
            
                    </Input>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}