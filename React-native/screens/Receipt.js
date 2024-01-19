import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateContract } from "../redux/globalSlice";
import Toast from "react-native-toast-message";
import {
  useChekoutMutation,
  useCreateOrderMutation,
  useGetOrdersCountQuery,
  useSendMessageMutation,
} from "../redux/services";
import Loader from "../components/Loader";
import { emptyCart } from "../redux/cartSlice";

export default function Receipt({ route }) {
  const { data, refetch, isLoading, isFetching } = useGetOrdersCountQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [createItemsOrder, { isLoading: orderItemsLoading }] =
    useChekoutMutation();

  const { total } = useSelector((state) => state.cartSlice);

  const {
    item = {},
    items = [],
    formData = {},
    storeName = "",
    supplierName = "",
  } = route.params;

  const user = useSelector((state) => state.authReducer.activeUser);

  const { contractTerms, contractDetails } = useSelector(
    (state) => state.global
  );
  const [sendMessage] = useSendMessageMutation();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const updatedItems = items?.map((item) => {
    return {
      ...item,
      email: formData.email,
      address: formData.address,
      country: formData.country,
      first_name: formData.firstName,
      last_name: formData.lastName,
      city: formData.city,
      postal_code: formData.postalCode,
      phone: formData.phone,
    };
  });

  const handleBuyNow = async () => {
    if (items?.length > 0) {
      createItemsOrder({ orders: updatedItems })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error });
          } else if (res.data.message) {
            Toast.show({ type: "success", text1: "Orders Confirmed" });
            dispatch(emptyCart());
            navigation.navigate("CartScreen");
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    } else {
      createOrder({
        sender: item.sender,
        receiver: user._id,
        item_name: item.item_name,
        item_image: item.item_image,
        price: item.price,
        unit: item.unit,
        qty: item.qty,
        email: formData.email,
        address: formData.address,
        country: formData.country,
        first_name: formData.firstName,
        last_name: formData.lastName,
        city: formData.city,
        postal_code: formData.postalCode,
        phone: formData.phone,
        inventory_id: item.inventory_id,
      })
        .then((res) => {
          if (res.error) {
            Toast.show({ type: "error", text1: res.error });
          } else if (res.data.message) {
            Toast.show({ type: "success", text1: "Order Successfuly Placed" });
            sendMessage({
              senderId: user._id,
              recepientId: item.sender,
              messageType: "receipt",
              message: item.item_name,
              terms: res.data.order.price,
              startDate: item.qty,
              endDate: res.data.order._id,
              order_status: formData.phone,
              delivery_date: formData.address,
              timestamp: new Date(),
            });
            navigation.navigate("BottomNavigation2");
          }
        })
        .catch((err) => Toast.show({ type: "error", text1: err.message }));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  const itemNotEmpty = Object.keys(item).length > 0;
  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title="Receipt"
        right="more-vertical"
        optionalBtn="shopping-cart"
        onRightPress={() => console.log("right")}
      />

      <ScrollView>
        <View
          className="flex-1 bg-white pt-8 mb-20"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <Text
            style={{ fontSize: 26, fontWeight: "bold" }}
            className="text-center text-black"
          >
            {storeName ? storeName : "Receipt"}
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold" }}
            className="text-center text-black"
          >
            Address: {formData?.address}
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginBottom: 40 }}
            className="text-center text-black mb-5"
          >
            Tel: {formData?.phone}
          </Text>
          <Text style={{ fontSize: 16 }} className="text-black ml-12">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - -
          </Text>
          {supplierName && (
            <View className="flex-row">
              <Text style={{ fontSize: 16 }} className="text-black ml-12">
                Supplier Name:
              </Text>
              <Text className="ml-20 bg-white text-black text-[16px]">
                {supplierName}
              </Text>
            </View>
          )}
          <View className="flex-row">
            <Text style={{ fontSize: 16 }} className="text-black ml-12">
              Order Number:
            </Text>
            {!isLoading && !isFetching && (
              <Text className="ml-20 bg-white text-black">
                {data !== undefined && data + 1}
              </Text>
            )}
          </View>
          <Text style={{ fontSize: 16 }} className="text-black ml-12">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - -
          </Text>
          <View className="flex-row">
            <Text style={{ fontSize: 16 }} className="text-black ml-12">
              Item Name
            </Text>
            <Text style={{ fontSize: 16 }} className="text-black ml-36">
              Qty
            </Text>
            <Text style={{ fontSize: 16 }} className="text-black ml-12">
              Price
            </Text>
          </View>
          {itemNotEmpty && (
            <View className="flex-row mt-2">
              <Text className="ml-12 bg-white text-black text-[16px] w-44">
                {item?.item_name}
              </Text>
              <Text className="bg-white text-black text-[16px]">
                {String(item?.qty)}
              </Text>
              <Text className="ml-12 bg-white text-black text-[16px]">
                {item?.price}
              </Text>
            </View>
          )}
          {items.length > 0 &&
            items?.map((item, index) => (
              <View key={index} className="flex-row mt-2">
                <Text className="ml-12 bg-white text-black text-[16px] w-44">
                  {item?.item_name}
                </Text>
                <Text className="ml-14 bg-white text-black text-[16px]">
                  {String(item?.qty)}
                </Text>
                <Text className="ml-12 bg-white text-black text-[16px]">
                  {item?.price}
                </Text>
              </View>
            ))}
          <Text style={{ fontSize: 16 }} className="text-black ml-12">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - -
          </Text>
          <Text style={{ fontSize: 16 }} className="text-black ml-12">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - -
          </Text>
          <View className="flex-row">
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
              className="text-black ml-12"
            >
              Sub Total:
            </Text>
            <Text className="ml-52 bg-white text-black text-[16px]">
              {items?.length > 0
                ? total
                : Number(item?.qty) * Number(item?.price)}
            </Text>
          </View>
          <View className="flex-row justify-end" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={() => handleBuyNow()}
              className=" bg-purple-500 rounded-xl items-center"
              style={{
                marginTop: 60,
                marginBottom: 20,
                width: 150,
                marginRight: 70,
              }}
            >
              {orderLoading || orderItemsLoading ? (
                <View style={{ height: 35 }}>
                  <Loader size={10} />
                </View>
              ) : (
                <Text className="font-xl font-bold text-center text-white mt-2 mb-2">
                  Confirm
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
