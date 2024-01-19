import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyHeader from "../components/MyHeader";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import { useAddInventoryCategoryMutation } from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign } from "@expo/vector-icons";

export default function AddCategory({ route }) {
  const navigation = useNavigation();
  const [addCategory] = useAddInventoryCategoryMutation();
  const { supCategories = [] } = route.params;

  const [category, setCategory] = useState({});
  const [showCategory, setShowCategory] = useState(false);
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
    if (!category?.name) {
      Toast.show({ type: "error", text1: "Please Select Category" });
    } else {
      setIsLoading(true);
      addCategory({
        name: category?.name,
        image: category?.image,
        cat_id: category?._id,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            Toast.show({ type: "success", text1: res.data.message });
            navigation.goBack();
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  }
  return (
    <View className="flex-1 bg-white">
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
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
          <Text
            style={{ fontSize: 18, marginBottom: 10 }}
            className="text-black ml-1"
          >
            Enter Category Name
          </Text>
          {/* <SelectList
            setSelected={(name) => console.log(name)}
            data={supCategories}
            // save="name"
            placeholder="Select Category"
            onSelect={(selected) => console.log(selected)}
            // boxStyles={{ borderColor: "white", backgroundColor: "#f3f4f6" }}
            // inputStyles={{ color: categoryName ? "#000" : "#a0a1a3" }}
            searchPlaceholder="Search"
          /> */}
          <TouchableOpacity
            style={{
              width: 434,
              borderWidth: 1,
              padding: 14,
              borderRadius: 10,
              borderColor: "lightgray",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => setShowCategory(true)}
          >
            <Text style={{ fontSize: 15 }}>
              {category?.name ? category?.name : "Select Category"}
            </Text>
            <AntDesign name="down" size={13} color="black" />
          </TouchableOpacity>
          {showCategory && (
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 10,
              }}
            >
              {supCategories &&
                supCategories?.data?.map((cat) => (
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontSize: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "lightgray",
                    }}
                    key={cat._id}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategory(false);
                    }}
                  >
                    {cat?.name}
                  </Text>
                ))}
            </View>
          )}

          {/* <TextInput
            className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          /> */}

          {/* <Text style={{ fontSize: 18 }} className="text-black ml-1 mt-5">
            Add Picture
          </Text> */}
          <View
            className="flex items-center p-5 mb-2 mx-2 mt-2 border-gray-400 "
            style={{
              width: 420,
              borderWidth: 2,
              borderStyle: "dashed",
            }}
          >
            {!showCategory && category?.image && (
              <Image
                style={{
                  height: 150,
                  width: 150,
                }}
                source={{ uri: category?.image }}
              />
            )}

            {/* <TouchableOpacity
              className="py-3 bg-amber-500 rounded-xl"
              style={{ width: 180 }}
              onPress={pickImage}
            >
              <Text className="font-xl font-bold text-center text-black">
                {pickedImage ? "Change" : "Upload"}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <TouchableOpacity
          className=" bg-amber-500 rounded-xl"
          onPress={() => handleAdd()}
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
