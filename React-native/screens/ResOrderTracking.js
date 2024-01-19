import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { DispachedOrder } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import MyHeader2 from "../components/MyHeader2";
import ResTracking from "../components/ResTracking";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useGetOrdersQuery } from "../redux/services";
import LoadingPlaceholder from "../common/Placeholders/MessagesPlaceholder";

export default function ResOrderTracking() {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [Orders, setOrders] = useState([]);
  const { data, isLoading } = useGetOrdersQuery();

  useEffect(() => {
    setOrders(data);
  }, [data]);

  const filteredData = Orders?.filter(
    (item) =>
      item?.item_name?.toLowerCase()?.includes(search.toLowerCase()) ||
      item?.receiver.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title="Order Tracking"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />
<ScrollView>
      <SafeAreaView className="flex-1 flex justify-between bg-white">
        <View className="flex-row justify-start mx-5"></View>

        {/* categories */}
        <View className="flex-row px-5 mt-6">
          <View className="ml-5" onPress={this}>
            <Icon
              name="shopping-bag"
              size={40}
              color="#A134F6"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Dispached</Text>
          </View>

          <View className="ml-28" onPress={this}>
            <Icon
              name="local-shipping"
              size={40}
              color="#A134F6"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Recieved</Text>
          </View>

          <View className="ml-32" onPress={this}>
            <Icon
              name="comment"
              size={40}
              color="#A134F6"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Review</Text>
          </View>
        </View>

        <View className="cart mx-5 flex-1">
          {/* search bar */}
          <View className=" mt-10 mb-10 shadow">
            <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
              <TextInput
                placeholder="Search Order"
                className="p-4 flex-1 font-semibold text-gray-700"
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
              <TouchableOpacity
                className="rounded-full p-2"
                style={{ backgroundColor: themeColors.resbg }}
              >
                <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {isLoading && <LoadingPlaceholder />}
            {data && search.length > 0
              ? filteredData.map((item) => (
                  <ResTracking track={item} key={item._id} />
                ))
              : data &&
                data.map((item) => <ResTracking track={item} key={item._id} />)}
          </View>
        </View>
      </SafeAreaView>
      </ScrollView>
    </View>
  );
}
