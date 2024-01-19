import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import supplierCard from "./SupplierCards";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import SupplierCards from "./SupplierCards";
import MyHeader from "../components/MyHeader";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";
import { BASE_URL } from "../config";
import Loader from "../components/Loader";
import { FontAwesome5 } from "@expo/vector-icons";
import * as FIcon from "react-native-feather";
import Toast from "react-native-toast-message";
import { BackHandler } from "react-native";

export default function SupplierDashboard() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("screen").height;
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const searchUsers = async () => {
    if (query.length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}user_search?name=${query}&role=restaurant`
      );
      const users = response.data || [];
      setSearchResults(users);
      setIsLoading(false);
      setShowResult(true);
    } catch (error) {
      setIsLoading(false);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  useEffect(() => {
    if (query.length === 0) {
      setShowResult(false);
    }
  }, [query]);

  return (
    <View className="flex-1">
      <MyHeader
        Sidebar
        title="Supplier Dashboard"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>Welcome</Text>

          <View
            style={{
              height: 60,
              marginTop: 35,
              marginBottom: 50,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              backgroundColor: "#F5F5F7",
              borderRadius: 30,
              alignContent: "center",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                color: "#616888",
                marginLeft: 5,
              }}
              placeholder="Search Restaurant"
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            <TouchableOpacity
              className="rounded-full p-2 mr-2"
              style={{ backgroundColor: Colors.primaryAmber }}
              onPress={() => searchUsers()}
            >
              {isLoading ? (
                <View className="rounded-full w-6 h-8 mt-3">
                  <Loader />
                </View>
              ) : (
                <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {!isLoading && showResult && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: screenHeight,
                top: 150,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              {searchResults.length > 0 ? (
                <FlatList
                  style={{
                    // backgroundColor: "#e6e6e6",
                    zIndex: 1,
                    borderRadius: 10,
                  }}
                  data={searchResults && searchResults}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: Colors.primaryAmber,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                      className="p-2 flex-row justify-between items-center my-5 mx-2"
                    >
                      <View
                        style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                        className="p-1 rounded-full"
                      >
                        <Image
                          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                          className="w-16 h-16 rounded-full"
                          source={{ uri: item?.image }}
                        />
                      </View>

                      <View className="flex-1 ml-3">
                        <Text className="text-lg font-bold text-white">
                          {item?.name}
                        </Text>
                        <View className="flex-row mt-2 item-center">
                          <Text className="mr-2">
                            <FontAwesome5
                              name="phone-alt"
                              size={15}
                              color="white"
                            />
                          </Text>
                          <Text className="text-white font-semibold">
                            {item.phone}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity
                          onPress={() => {
                            setShowResult(false);
                            setQuery(" ");
                            navigation.navigate("ChattingScreen", {
                              recepientId: item?._id,
                              recepientName: item?.name,
                              recepientImage: item?.image,
                            });
                          }}
                          className="bg-white p-2 rounded-full"
                        >
                          <FIcon.MessageSquare
                            fill={Colors.primaryAmber}
                            stroke={Colors.primaryAmber}
                            strokeWidth="5"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              ) : (
                showResult &&
                searchResults.length === 0 && (
                  <Text
                    className="text-lg text-center bg-gray-200 py-5"
                    style={{ borderRadius: 10 }}
                  >
                    No Supplier Found
                  </Text>
                )
              )}
            </View>
          )}
        </View>

        <View className="flex" style={{ zIndex: -1 }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyContracts")}>
            <View
              className="flex-row items-center p-3 mb-2 mx-2 ml-14 bg-amber-500"
              style={{
                position: "relative",
                marginLeft: 10,
                marginRight:10,
                borderRadius: 40,
                borderWidth: 1,
              }}
            >
              <Image
                source={require("../assets/images/contract.png")}
                style={{ width: 160, height: 150 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 28,
                    marginLeft: 0,
                    marginBottom: 10,
                    marginTop: 20,
                    fontWeight: "bold",
                    color: Colors.black,
                  }}
                >
                  Contracts
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("MyBids")}>
            <View
              className="flex-row items-center p-3 mb-2 mx-2 ml-14 bg-amber-500 "
              style={{
                position: "relative",
                marginLeft: 10,
                marginRight:10,
                borderRadius: 40,
                borderWidth: 1,
              }}
            >
              <Image
                source={require("../assets/images/bid2.png")}
                style={{ width: 160, height: 150 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 28,
                    marginLeft: 30,
                    marginBottom: 10,
                    marginTop: 20,
                    fontWeight: "bold",
                    color: Colors.black,
                  }}
                >
                  Bids
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
