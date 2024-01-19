import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import { useAddInventoryCategoryMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

export default function ResAddCategory() {
  const navigation = useNavigation();
  const [addCategory] = useAddInventoryCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImage(result.assets[0]);
    }
  };

  async function handleAdd() {
    if (!pickedImage) {
      return Toast.show({ type: "error", text1: "Please Add Picture" });
    }
    setIsLoading(true);
    const response = await uploadImageToCloudinary(pickedImage);
    addCategory({ name: categoryName, image: response })
      .then((res) => {
        setIsLoading(false);
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Category Added" });
          navigation.goBack();
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        title="Inventory"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <ScrollView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <Text
            style={{ fontSize: 26, fontWeight: "bold", marginBottom: 40 }}
            className="text-center text-black mb-5"
          >
            {" "}
            Add Category
          </Text>

          <Text style={{ fontSize: 18 }} className="text-black ml-1">
            Enter Category Name
          </Text>
          <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />

          <Text style={{ fontSize: 18 }} className="text-black ml-1 mt-5">
            Add Picture
          </Text>

          <View
            className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 "
            style={{
              width: 400,
              borderWidth: 2,
              borderStyle: "dashed",
            }}
          >
            {pickedImage && (
              <Image
                style={{
                  height: 150,
                  width: 150,
                }}
                source={{ uri: pickedImage.uri }}
              />
            )}
            <TouchableOpacity
              className="py-3 bg-purple-500 rounded-xl"
              style={{ width: 180 }}
              onPress={pickImage}
            >
              <Text className="font-xl font-bold text-center text-black">
                {pickedImage ? "Change" : "Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className=" bg-purple-500 rounded-xl"
          onPress={handleAdd}
          style={{
            width: "70%",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 150,
            marginTop: 50,
            marginLeft: 70,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              letterSpacing: 1,
              marginRight: 10,
            }}
          >
            {isLoading ? <Loader /> : "Add"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
