import React, { useState, useEffect } from "react";

import {
  Box,
  FormControl,
  HStack,
  VStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  FormControlLabel,
  Text,
  InputField,
  Input as GlueInput,
  Pressable,
  Heading,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Alert,
  AlertText,
  ScrollView,
  Center,
} from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import { addNote, getNote } from "../../actions/AuthAction";
import { Image, View, TouchableOpacity } from "react-native";
import firebase from "../../config/FIREBASE";
import { uploadImage } from "../../actions/AuthAction";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Add = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categoryUser, setCategoryUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [image, setImage] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const ubahStatus = (status) => {
    setStatus(status);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setCategoryUser(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onAddNote = async () => {
    if (!title || !content || !status || !category) {
      console.log("Error", "Data tidak lengkap");
      toggleAlert("Data tidak lengkap");
      return;
    }

    try {
      let imageUrls = []; // Ini akan digunakan untuk menyimpan URL gambar

      if (image) {
        const imageUrl = await uploadImage(image, "nama_file.jpg");
        imageUrls.push(imageUrl); // Tambahkan URL gambar ke dalam array
      }

      const data = {
        title,
        content,
        status,
        category,
        imageUrls, // Kirimkan array imageUrls
      };

      // asyn pkai update, update dr id note

      await addNote(data);
      navigation.replace("MainApp");
    } catch (error) {
      console.log("Error", error.message);
      toggleAlert(error.message);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategoryUser((prevCategories) => [...prevCategories, newCategory]);
      setNewCategory("");
      setIsModalVisible(false);
    }
  };

  const sendDataToFirebase = () => {
    setIsLoading(true);
    try {
      const uploadImage = async () => {
        try {
          const response = await fetch(image);
          const blob = await response.blob();

          const imageName = Date.now(); // Nama unik untuk setiap gambar
          const storageRef = FIREBASE.storage()
            .ref()
            .child(`MyResep/${imageName}`);

          // Upload gambar ke Firebase Storage
          const snapshot = await storageRef.put(blob);

          // Dapatkan URL gambar dari Firebase Storage
          const imageUrl = await snapshot.ref.getDownloadURL();

          return imageUrl;
        } catch (error) {
          console.error("Gagal mengunggah gambar:", error);
          throw new Error("Gagal mengunggah gambar");
        }
      };

      uploadImage()
        .then((imageUrl) => {
          const ResepData = {
            timestamp: FIREBASE.database.ServerValue.TIMESTAMP,
            products: {}, // Buat objek kosong untuk menyimpan data produk
            imageUrl,
            category,
            content,
            status,
            title,
          };

          // Simpan data ke Firebase Database
          FIREBASE.database()
            .ref("MyRsesp")
            .push(ResepData)
            .then(() => {
              console.log("Data berhasil terkirim ke Firebase!");
              setModal(false);
              setIsLoading(false);

              // Mengosongkan nilai state
              setImage(null);
            });
        })
        .catch((error) => {
          console.error("Gagal menyimpan data:", error);
          Alert.alert("Gagal menyimpan data!");
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Alert.alert("Terjadi kesalahan!");
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Izin akses galeri diperlukan");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Menggunakan kunci "assets" untuk mengakses gambar yang dipilih
      setImage(result.assets[0].uri);
    } else {
      console.log("Pemilihan gambar dibatalkan");
    }
  };

  return (
    <ScrollView>
      <Box flex={1} backgroundColor="$white" marginBottom={90}>
        <Box
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={"$25"}
          shadowRadius={"$3.5"}
          elevation={"$5"}
          backgroundColor="$white"
          borderRadius={"$md"}
          mt={"$8"}
          mx={"$3"}
          px={"$3"}
          pt={"$2"}
          mb={"$50"}
        >
          <Heading size="2xl" color="$black">
            Add New Task!
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Add your new task here!
          </Text>
          <FormControl>
            <Input
              label={"Title"}
              width={"$full"}
              height={"$10"}
              onChangeText={(title) => setTitle(title)}
            />
            <Input
              textarea={true}
              label="Content"
              width={"$full"}
              height={"$10"}
              onChangeText={(content) => setContent(content)}
            />
            <Pilihan
              label="Status"
              selectedValue={status}
              onValueChange={(status) => ubahStatus(status)}
            />
            <Pilihan
              label="Category"
              selectedValue={category}
              datas={categoryUser}
              onValueChange={(selectedCategory) =>
                setCategory(selectedCategory)
              }
            />
            <Box mt={5}>
              <Heading color={"#006664"} fontSize={18}>
                Upload Gambar
              </Heading>
              <HStack>
                <TouchableOpacity onPress={pickImage}>
                  <Box
                    backgroundColor={"gray.200"}
                    size={100}
                    mt={4}
                    display={!image ? "flex" : "none"} // Menyembunyikan box  saat ada gambar
                  >
                    <Center mt={4}>
                      <Ionicons name="cloud-upload" size={60} color="gray" />
                    </Center>
                  </Box>
                </TouchableOpacity>
                {image && (
                  <Image
                    source={{ uri: image }}
                    size={200}
                    alt="foto"
                    value={image}
                    mt={4}
                    borderRadius={10}
                  />
                )}
              </HStack>
            </Box>
            <Button
              type="text"
              title="Add New Category"
              onPress={toggleModal}
              padding={10}
            />
            <Button
              type="text"
              title="Save"
              padding={10}
              onPress={() => {
                onAddNote();
              }}
            />
          </FormControl>
        </Box>

        <Modal
          isOpen={isModalVisible}
          onClose={toggleModal}
          finalFocusRef={this.btnRef}
        >
          <ModalBackdrop />
          <ModalContent
            backgroundColor="$white"
            padding={"$2"}
            borderRadius={"$lg"}
          >
            <ModalHeader>
              <VStack space="sm">
                <Heading size="lg">Add New Category</Heading>
                <Text size="sm">
                  Having a lot of task must be needing categories too!
                </Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <GlueInput>
                <InputField
                  role="form"
                  placeholder="Category Name"
                  value={newCategory}
                  onChangeText={(text) => setNewCategory(text)}
                />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Box
                flex={1}
                flexDirection="column"
                justifyContent="space-evenly"
              >
                <Pressable
                  backgroundColor="$blue500"
                  p={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={handleAddCategory} // Trigger category addition
                >
                  <Text color="$white" fontWeight="$bold">
                    Add
                  </Text>
                </Pressable>

                <Pressable
                  backgroundColor="$red700"
                  p={"$2"}
                  mt={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={toggleModal} // Close modal
                >
                  <Text color="$white" fontWeight="$bold">
                    Cancel
                  </Text>
                </Pressable>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* show Alert */}
        {showAlert && (
          <Modal isOpen={showAlert} onClose={toggleAlert}>
            <ModalBackdrop />
            <Alert mx="$4" action="error" variant="solid">
              <AlertText fontWeight="$bold">Error!</AlertText>
              <AlertText>{alertMessage}</AlertText>
            </Alert>
          </Modal>
        )}
      </Box>
    </ScrollView>
  );
};

export default Add;
