import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import {
  useSendMessageMutation,
  useUpdateOrderMutation,
} from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "./Loader";

export default function Request({ req }) {
  const [selectedItem, setSelectedItem] = useState({});
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const [sendMessage] = useSendMessageMutation();

  const handleAccept = async (id) => {
    updateOrder({ id, data: { status: "dispatched" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Order Accepted" });
          sendMessage({
            senderId: res.data.order.sender,
            recepientId: res.data.order.receiver,
            messageType: "order",
            message: `${res.data.order.qty} ${res.data.order.unit} ${res.data.order.item_name}`,
            orderId: res.data.order._id,
            order_status: res.data.order.status,
            delivery_date: new Date(
              new Date().setDate(new Date().getDate() + 1)
            ),
            timestamp: new Date(),
          });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  const handleReject = async (id) => {
    updateOrder({ id, data: { status: "rejected" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Order Rejected" });
          sendMessage({
            senderId: res.data.order.sender,
            recepientId: res.data.order.receiver,
            messageType: "order",
            message: `${res.data.order.qty} ${res.data.order.unit} ${res.data.order.item_name}`,
            orderId: res.data.order._id,
            order_status: res.data.order.status,
            delivery_date: new Date(
              new Date().setDate(new Date().getDate() + 1)
            ),
            timestamp: new Date(),
          });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  const navigation = useNavigation();
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-2 mx-2">
      <Image
        className="rounded-3xl"
        style={{ height: 100, width: 100 }}
        source={{ uri: req.receiver.image }}
      />
      <View className="flex flex-1 space-y-3 ">
        <View className="pl-3">
          <Text className="text-xl">{req.receiver.name}</Text>
          <Text className="text-gray-700">{`i want ${req.qty} ${
            req.unit || ""
          } ${req.item_name}`}</Text>
        </View>
        <View className="flex-row pl-3 justify-between items-center">
          <Text className="text-gray-700 text-lg font-bold"></Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                setSelectedItem({ name: "accept", _id: req._id });
                handleAccept(req._id);
              }}
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              {updateLoading &&
              req._id === selectedItem._id &&
              selectedItem.name === "accept" ? (
                <Loader size={20} />
              ) : (
                <Icon.Check
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedItem({ name: "reject", _id: req._id });
                handleReject(req._id);
              }}
              className="p-1 rounded-full"
              style={{
                backgroundColor: themeColors.bgColor(1),
                marginLeft: 20,
              }}
            >
              {updateLoading &&
              req._id === selectedItem._id &&
              selectedItem.name === "reject" ? (
                <Loader size={20} />
              ) : (
                <Icon.X strokeWidth={2} height={20} width={20} stroke="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
