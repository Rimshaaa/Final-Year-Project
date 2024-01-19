import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { COLOURS } from "../components/items2";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MyHeader from "../components/MyHeader";
import Header from "../components/MyHeader";
import { color } from "react-native-reanimated";
import {
  useDeleteStoreItemMutation,
  useUpdateInventoryItemMutation,
  useUpdateStoreItemMutation,
} from "../redux/services";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import Colors from "../constants/Colors";

const EditStoreItems = ({ route, navigation }) => {
  const { storeId, item, prevScreen } = route.params;

  const [deleteItem, { isLoading: deleteLoading }] =
    useDeleteStoreItemMutation();

  const [updatItem] = useUpdateStoreItemMutation();

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    name: item?.name,
    quantity: item?.qty,
    price: item?.price,
    image: item?.image,
  });

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

  function handleDelete() {
    deleteItem({ storeId, itemId: item._id })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          navigation.navigate("MyStore");
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }

  async function handleUpdate() {
    setIsLoading(true);
    let response;
    if (pickedImage) {
      response = await uploadImageToCloudinary(pickedImage);
    }
    updatItem({
      storeId,
      itemId: item._id,
      data: {
        name: data.name,
        image: pickedImage ? response : data?.image,
        qty: data.quantity,
        price: data.price,
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

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        flexDirection: "column",
      }}
    >
      <Header
        // Sidebar
        title={`${data?.name} Item Edit`}
        back
        onPressBack={() => navigation.goBack()}
        // right="more-vertical"
        // optionalBtn="shopping-cart"
        // onRightPress={() => console.log("right")}
      />

      <TouchableOpacity
        style={{
          marginTop: 40,
          width: 200,
          height: 200,
          alignItems: "center",
          marginLeft: 140,
          borderWidth: 2,
          borderColor: COLOURS.lightGray,
          borderBottomLeftRadius: 200,
          borderBottomRightRadius: 200,
          borderTopLeftRadius: 200,
          borderTopRightRadius: 200,
        }}
        onPress={pickImage}
      >
        {pickedImage ? (
          <Image
            style={{ width: 120, height: 120, marginTop: 30, borderRadius: 10 }}
            source={{ uri: pickedImage.uri }}
          />
        ) : (
          <Image
            style={{ width: 120, height: 120, marginTop: 30, borderRadius: 10 }}
            source={{ uri: data?.image }}
          />
        )}

        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLOURS.lightGray,
            borderTopRightRadius: 100,
            borderBottomLeftRadius: 100,
            borderTopLeftRadius: 100,
            borderBottomRightRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 90,
            top: 160,
            right: 20,
            marginLeft: 400,
          }}
        >
          <Entypo
            name="camera"
            style={{ fontSize: 18, color: COLOURS.black }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          maxHeight: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8,
                marginBottom: 5,
              }}
            >
              Name
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth: 2,
                width: 300,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.6,
              }}
              value={data.name}
              onChangeText={(text) => setData({ ...data, name: text })}
            />
          </View>

          <View className="flex-row">
            <View style={{ paddingVertical: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLOURS.black,
                  opacity: 0.8,
                  marginBottom: 5,
                }}
              >
                Quantity
              </Text>
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  fontSize: 18,
                  borderWidth: 2,
                  width: 300,
                  height: 50,
                  borderColor: COLOURS.lightGray,
                  color: COLOURS.black,
                  fontWeight: "600",
                  opacity: 0.6,
                }}
                value={data.quantity}
                onChangeText={(text) => setData({ ...data, quantity: text })}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 20, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8,
                marginBottom: 5,
              }}
            >
              Price / Unit
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 10,
                fontSize: 18,
                borderWidth: 2,
                width: 300,
                height: 50,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                fontWeight: "600",
                opacity: 0.6,
              }}
              value={data.price}
              onChangeText={(text) => setData({ ...data, price: text })}
            />
          </View>
        </View>
      </View>
      <View
        className="flex-row"
        style={{
          position: "relative",
          width: "100%",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleUpdate()}
          style={{
            width: 150,
            height: 40,
            backgroundColor:
              prevScreen === "supplierInventory"
                ? Colors.primaryAmber
                : Colors.primaryAmber,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 80,
            marginBottom: 0,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: COLOURS.black,
              letterSpacing: 1,
              marginRight: 10,
            }}
          >
            {isLoading ? <Loader /> : "Edit"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            width: 150,
            height: 40,
            backgroundColor:
              prevScreen === "supplierInventory"
                ? Colors.primaryAmber
                : Colors.primaryAmber,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 80,
            marginBottom: 0,
            marginLeft: 50,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: COLOURS.black,
              letterSpacing: 1,
              marginRight: 10,
            }}
          >
            {deleteLoading ? <Loader /> : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditStoreItems;
