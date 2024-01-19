import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput,ScrollView } from "react-native";
import { COLOURS } from "../components/items";
import Entypo from "react-native-vector-icons/Entypo";
import MyHeader2 from "../components/MyHeader2";
import { useAddInventoryItemMutation } from "../redux/services";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils";
import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import { SelectList } from "react-native-dropdown-select-list";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const ResAddInventoryItems = ({ route, navigation }) => {
  const { Categories } = route.params;
  const [addItem] = useAddInventoryItemMutation();

  const [pickedImage, setPickedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", quantity: "", price: "" });
  const [CategoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState({});
  const [showCategory, setShowCategory] = useState(false);

  const CatList = Categories.map((cat) => {
    return {
      key: cat._id,
      value: cat.name,
    };
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

  async function handleAdd() {
    if (!pickedImage) {
      return Toast.show({ type: "error", text1: "Please Add Picture" });
    }
    setIsLoading(true);
    const response = await uploadImageToCloudinary(pickedImage);
    addItem({
      id: category._id,
      name: data.name,
      image: response,
      qty: data.quantity,
      price: data.price,
      category_id: CategoryId,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.error) {
          Toast.show({ type: "error", text1: res.error.data.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Item Added" });
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
      <MyHeader2
        title="Inventory"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
 <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <TouchableOpacity
              style={{
                // marginTop: 40,
                width: 200,
                height: 200,
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                borderWidth: 2,
                borderColor: COLOURS.lightGray,
                borderBottomLeftRadius: 200,
                borderBottomRightRadius: 200,
                borderTopLeftRadius: 200,
                borderTopRightRadius: 200,
                marginBottom: 10,
              }}
              onPress={pickImage}
            >
              {pickedImage ? (
                <Image
                  style={{ width: 120, height: 120, marginTop: 30 }}
                  source={{ uri: pickedImage.uri }}
                />
              ) : (
                <Image
                  style={{ width: 120, height: 120, marginTop: 30 }}
                  source={require("../assets/image-placeholder.png")}
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
          </View>
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
                paddingLeft: 25,
              }}
              value={data.name}
              onChangeText={(text) => setData({ ...data, name: text })}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                opacity: 0.8,
                marginBottom: 5,
              }}
            >
              Category
            </Text>
            <TouchableOpacity
              style={{
                // width: 434,
                borderWidth: 1,
                padding: 14,
                borderColor: COLOURS.lightGray,
                color: COLOURS.black,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
              onPress={() => setShowCategory(!showCategory)}
            >
              <Text style={{ fontSize: 15 }}>
                {category?.name && category?.name}
              </Text>
              <AntDesign name="down" size={13} color="black" />
            </TouchableOpacity>
            {showCategory && (
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "lightgray",
                  borderRadius: 5,
                }}
              >
                {Categories &&
                  Categories?.map((cat, index) => (
                    <Text
                      style={{
                        paddingVertical: 6,
                        fontSize: 15,
                        borderBottomWidth:
                          index < Categories?.length - 1 ? 1 : 0,
                        borderBottomColor: "lightgray",
                        marginLeft: 10,
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
            {/* <SelectList
              setSelected={(key) => setCategoryId(key)}
              data={(CatList && CatList) || []}
              save="key"
              boxStyles={{
                borderColor: "gray",
                backgroundColor: "white",
                borderRadius: 1,
              }}
              placeholder=""
              inputStyles={{
                padding: 1,
                fontSize: 17,
                color: "gray",
              }}
              searchPlaceholder="Search"
              search={false}
            /> */}
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
                  paddingLeft: 25,
                }}
                keyboardType="number-pad"
                value={data.quantity}
                onChangeText={(text) => setData({ ...data, quantity: text })}
              />
            </View>
          </View>
          <View>
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
                paddingLeft: 25,
              }}
              keyboardType="number-pad"
              value={data.price}
              onChangeText={(text) => setData({ ...data, price: text })}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleAdd()}
          style={{
            width: 300,
            height: 60,
            backgroundColor: Colors.resprimary,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 30,
            marginBottom: 200,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: COLOURS.white,
              letterSpacing: 1,
              marginRight: 10,
            }}
          >
            {isLoading ? <Loader /> : "Add Item"}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default ResAddInventoryItems;
