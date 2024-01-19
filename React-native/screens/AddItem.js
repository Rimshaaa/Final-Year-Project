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
import MyHeader from "../components/MyHeader";
import {
  useAddStoreItemMutation,
  useGetSupplierCategoriesQuery,
} from "../redux/services";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { uploadImageToCloudinary } from "../utils";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { UNITS } from "../constants";

export default function AddItem({ route }) {
  const { store } = route.params;
  const { data } = useGetSupplierCategoriesQuery();
  const [addItem] = useAddStoreItemMutation();
  const user = useSelector((state) => state.authReducer.activeUser);

  const [selected, setSelected] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    offerPrice: "",
    ItemDescription: "",
    unit: "",
  });

  const navigation = useNavigation();

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
      Toast.show({ type: "error", text1: "Please Add Image" });
    } else if (
      !formData.itemName ||
      !formData.price ||
      !formData.offerPrice ||
      !formData.ItemDescription ||
      !selected ||
      !formData.unit
    ) {
      Toast.show({ type: "error", text1: "Please Fill All Fields" });
    } else {
      setIsLoading(true);
      const response = await uploadImageToCloudinary(pickedImage);
      addItem({
        storeId: store._id,
        data: {
          name: formData.itemName,
          image: response,
          price: formData.price,
          unit: formData.unit,
          offer_price: formData.offerPrice,
          category: selected,
          description: formData.ItemDescription,
          created_by: user._id,
        },
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
        title="Add Item"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <ScrollView>
        <View className="flex-row items-center mt-5 relative">
          {pickedImage ? (
            <>
              <Image
                className="flex items-center p-3 mb-2 mx-2 ml-40  "
                style={{ width: 160, height: 140, marginTop: 30 }}
                source={{ uri: pickedImage.uri }}
              />
              <MaterialIcons
                name="highlight-remove"
                size={24}
                color="red"
                style={{ position: "absolute", right: 40, top: 20 }}
                onPress={() => setPickedImage()}
              />
            </>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="flex items-center p-3 mb-2 mx-2 ml-40 border-gray-400 "
              style={{
                height: 140,
                width: 160,
                borderWidth: 2,
                borderStyle: "dashed",
              }}
            >
              <Text style={{ fontSize: 32, fontWeight: "semibold" }}>+</Text>
              <Text style={{ fontSize: 24 }}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2 mb-24">
            <Text className="text-black ml-1">Item Name</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6"
              placeholder="Enter Name"
              value={formData.itemName}
              onChangeText={(text) =>
                setFormData({ ...formData, itemName: text })
              }
            />
            <Text className="text-black ml-1 mb-2">Category</Text>
            <SelectList
              setSelected={(key) => setSelected(key)}
              data={data}
              save="key"
              placeholder="Select Category"
              boxStyles={{ borderColor: "white", backgroundColor: "#f3f4f6" }}
              inputStyles={{ color: selected ? "#000" : "#a0a1a3" }}
              searchPlaceholder="Search"
            />
            <Text className="text-black ml-1">Price</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6"
              placeholder="Enter Price"
              keyboardType="number-pad"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            <Text className="text-black ml-1 mb-2">Unit</Text>
            <SelectList
              setSelected={(value) => setFormData({ ...formData, unit: value })}
              data={UNITS}
              save="value"
              placeholder="Select Unit"
              boxStyles={{ borderColor: "white", backgroundColor: "#f3f4f6" }}
              inputStyles={{ color: selected ? "#000" : "#a0a1a3" }}
              searchPlaceholder="Search"
            />
            <Text className="text-black ml-1">Offer Price</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6"
              placeholder="Enter Offered price"
              keyboardType="number-pad"
              value={formData.offerPrice}
              onChangeText={(text) =>
                setFormData({ ...formData, offerPrice: text })
              }
            />
            <Text className="text-black ml-1">Item Description</Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl pl-6 mb-2"
              placeholder="Enter Description"
              value={formData.ItemDescription}
              onChangeText={(text) =>
                setFormData({ ...formData, ItemDescription: text })
              }
            />

            <TouchableOpacity
              className="py-3 bg-amber-500 rounded-xl"
              onPress={handleAdd}
            >
              <Text
                style={{ fontSize: 18 }}
                className="font-xl font-bold text-center text-black"
              >
                {isLoading ? (
                  <View className="flex items-center justify-center">
                    <Loader />
                  </View>
                ) : (
                  "Add Item"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
