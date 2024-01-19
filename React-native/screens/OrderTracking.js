import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import MyHeader from "../components/MyHeader";
import Tracking from "../components/Tracking";
import { useGetSupplierOrdersQuery } from "../redux/services";
import LoadingPlaceholder from "../common/Placeholders/MessagesPlaceholder";

export default function OrderTracking() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetSupplierOrdersQuery();
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(data);
  }, [data]);

  const navigation = useNavigation();

  const filteredData = Orders?.filter(
    (item) =>
      item.item_name.toLowerCase().includes(search.toLowerCase()) ||
      item.receiver.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title="Order Tracking"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <SafeAreaView className="flex-1 flex justify-between bg-white">
        <View className="flex-row justify-start mx-5"></View>

        {/* categories */}
        <View className="flex-row px-5 mt-6">
          <View className="ml-5" onPress={this}>
            <Icon
              name="shopping-bag"
              size={40}
              color="#FF9801"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Dispached</Text>
          </View>

          <View className="ml-28" onPress={this}>
            <Icon
              name="local-shipping"
              size={40}
              color="#FF9801"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Recieved</Text>
          </View>

          <View className="ml-32" onPress={this}>
            <Icon
              name="comment"
              size={40}
              color="#FF9801"
              style={{ height: 35, width: 45 }}
            />
            <Text style={(fontSize = 24)}>Review</Text>
          </View>
        </View>

        <View className="cart mx-5 flex-1">
          <View
            style={{
              height: 60,
              marginTop: 35,
              marginBottom: 35,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              backgroundColor: "#F5F5F7",
              borderRadius: 30,
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <Icon name="search" size={30} />
            <TextInput
              style={{ fontSize: 18, color: "#616888", marginLeft: 5 }}
              placeholder="Search Order"
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
          </View>

          <View>
            {isLoading && <LoadingPlaceholder />}
            {data && search.length > 0
              ? filteredData.map((item) => {
                  if (item.status !== "pending" && item.status !== "rejected") {
                    return <Tracking track={item} key={item._id} />;
                  }
                })
              : data &&
                data.map((item) => {
                  if (item.status !== "pending" && item.status !== "rejected") {
                    return <Tracking track={item} key={item._id} />;
                  }
                })}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
