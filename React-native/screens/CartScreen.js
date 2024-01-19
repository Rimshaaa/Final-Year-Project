import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import StarRating from "react-native-star-rating";
import Cart from "../components/Cart";
// import { cart } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/cartSlice";
import Empty from "../components/Empty";
import Toast from "react-native-toast-message";
import { useChekoutMutation } from "../redux/services";
import Loader from "../components/Loader";

const height = Dimensions.get("screen").height;

export default function CartScreen(props) {
  const { total, cart } = useSelector((state) => state.cartSlice);
  const [createOrder, { isLoading: orderLoading }] = useChekoutMutation();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCheckout() {
    let cartArray = cart.map((obj) => ({ ...obj, _id: undefined }));
    navigation.navigate("Checkout", {
      items: cartArray,
    });

    // createOrder({ orders: cartArray })
    //   .then((res) => {
    //     if (res.error) {
    //       Toast.show({ type: "error", text1: res.error });
    //     } else if (res.data.message) {
    //       Toast.show({ type: "success", text1: "Orders Confirmed" });
    //       dispatch(emptyCart());
    //     }
    //   })
    //   .catch((err) => Toast.show({ type: "error", text1: err.message }));
  }
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="flex-1 flex justify-between bg-white">
          <View className="flex-row justify-start mx-5">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="border border-purple-500 rounded-xl"
            >
              <ChevronLeftIcon size="30" color="purple" />
            </TouchableOpacity>
          </View>
          <View className="mx-5 flex-1">
            <Text
              style={{ color: themeColors.text }}
              className="text-2xl py-10"
            >
              Your <Text className="font-bold">Cart</Text>
            </Text>
            {cart?.length > 0 ? (
              <View className="mt-10" style={{ minHeight: height - 400 }}>
                {cart.map((item, index) => (
                  <Cart cart={item} key={index} />
                ))}
              </View>
            ) : (
              <View style={{ minHeight: height - 180 }}>
                <Empty text="Cart is Empty" />
              </View>
            )}
            {cart?.length > 0 && (
              <View className="flex-row justify-end py-4">
                <Text className="text-lg">
                  Total price:{" "}
                  <Text className="font-bold text-purple-500">Rs {total}</Text>
                </Text>
              </View>
            )}
          </View>
          {cart?.length > 0 && (
            <View className="flex-row justify-between items-center mx-32 mt-5 mb-10">
              <TouchableOpacity
                style={{
                  backgroundColor: themeColors.resbg,
                  opacity: 0.8,
                  shadowColor: "orange",
                  shadowRadius: 25,
                  shadowOffset: { width: 0, height: 15 },
                  shadowOpacity: 0.4,
                }}
                className="p-3 flex-1 rounded-xl"
                onPress={() => handleCheckout()}
                disabled={orderLoading}
              >
                <Text className="text-xl text-center text-white font-bold">
                  {orderLoading ? (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Loader />
                    </View>
                  ) : (
                    "Order"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
