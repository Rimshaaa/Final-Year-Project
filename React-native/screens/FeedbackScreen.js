import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import { SelectList } from "react-native-dropdown-select-list";
import {
  useAddDisputeMutation,
  useSendMessageMutation,
} from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { uploadImagesToCloudinary } from "../utils";
import Colors from "../constants/Colors";

export default function FeedbackScreen({ route }) {
  const user = useSelector((state) => state.authReducer.activeUser);

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [addDispute] = useAddDisputeMutation();
  const [sendMessage] = useSendMessageMutation();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0]]);
    }
  };

  async function handleAddDispute() {
    if (!formData.name || !formData.email || !formData.description) {
      Toast.show({ type: "error", text1: "Please Fill All Fields" });
    } else {
      setIsLoading(true);
      let imageURLS;
      if (selectedImages.length > 0) {
        const response = await uploadImagesToCloudinary(selectedImages);
        imageURLS = response;
      }
      addDispute({
        restaurant_name: user.name,
        restaurant_email: user.email,
        supplier_name: formData.name,
        supplier_email: formData.email,
        description: formData.description,
        files: imageURLS,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.error) {
            Toast.show({ type: "error", text1: res.error.data.error });
          } else if (res.data.message) {
            Toast.show({ type: "success", text1: res.data.message });
            sendMessage({
              senderId: user._id,
              recepientId: res.data.data.senderId,
              messageType: "dispute",
              message: formData.description,
              dispute_images: imageURLS,
              timestamp: new Date(),
            });
            navigation.navigate("BottomNavigation2");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.show({ type: "error", text1: err.message });
        });
    }
  }

  const handleImageRemove = (index) => {
    const updatedImages = selectedImages.filter((uri, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title="File Dispute"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
      <ScrollView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2 mb-4">
            <Text className="text-black ml-1" style={{ fontSize: 18 }}>
              Supplier name
            </Text>
            <TextInput
              className="p-2 text-gray-700 rounded-xl pl-6 mb-2"
              style={{ borderWidth: 1 }}
              placeholder="Enter supplier name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Text className="text-black ml-1" style={{ fontSize: 18 }}>
              Supplier email
            </Text>
            <TextInput
              className="p-2 text-gray-700 rounded-xl pl-6 mb-2"
              style={{ borderWidth: 1 }}
              placeholder="Enter supplier email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <Text className="text-black ml-1" style={{ fontSize: 18 }}>
              Description
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={12}
              className="p-2 text-gray-700 rounded-xl pl-6 mb-2"
              style={{ borderWidth: 1 }}
              placeholder="Explain your issue"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
            <Text className="text-black ml-1" style={{ fontSize: 18 }}>
              Supporting Documents
            </Text>
            <View
              className="flex items-center p-3 mb-2 mx-2 mt-2 border-gray-400 "
              style={{
                // height: 200,
                // width: 400,
                borderWidth: 2,
                borderStyle: "dashed",
                marginBottom: 10,
              }}
            >
              {selectedImages.length === 0 && (
                <Text
                  className="text-gray-500"
                  style={{ fontSize: 16, marginTop: 20 }}
                >
                  Upload files here
                </Text>
              )}
              {selectedImages.length === 0 && (
                <Text
                  className="text-gray-400"
                  style={{ fontSize: 12, marginTop: 10 }}
                >
                  This section is optional but we strongly recommend attaching
                  as much evidence as possible
                </Text>
              )}
              <ScrollView horizontal style={{ margin: 10 }}>
                {selectedImages.map((uri, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => handleImageRemove(index)}
                      style={{ marginRight: 10 }}
                    >
                      <Image
                        source={{ uri: uri.uri }}
                        style={{ width: 150, height: 150, borderRadius: 10 }}
                      />
                      <FontAwesome5
                        name="times-circle"
                        size={24}
                        color="red"
                        style={{
                          position: "absolute",
                          top: -1,
                          right: -1,
                          zIndex: 1,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                className="py-3 bg-gray-300 rounded-xl flex items-center"
                style={{ marginTop: 40, width: 180 }}
                onPress={pickImageAsync}
              >
                {selectedImages.length === 0 ? (
                  <Text className="font-xl font-bold text-center text-black">
                    Upload
                  </Text>
                ) : (
                  <FontAwesome5
                    name="plus-circle"
                    size={24}
                    color={Colors.resprimary}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleAddDispute}
              className="py-3 bg-purple-500 rounded-xl"
            >
              {isLoading ? (
                <Loader size={25} />
              ) : (
                <Text
                  style={{ fontSize: 18 }}
                  className="font-xl text-center text-white"
                >
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
