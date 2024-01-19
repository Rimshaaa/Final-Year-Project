import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { getDistance } from "geolib";
import { StarIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";

export default function BidRequest({ req, postLocation, post }) {
  const user = useSelector((state) => state.authReducer.activeUser);
  const distance = getDistance(
    {
      latitude: parseFloat(user.location.latitude),
      longitude: parseFloat(user.location.longitude),
    },
    {
      latitude: req.bid_by.location.latitude,
      longitude: req.bid_by.location.longitude,
    }
  );

  function metersToTime(distanceMeters, speedKph) {
    let distanceKm = distanceMeters / 1000;
    let timeHours = distanceKm / speedKph;
    let timeMinutes = timeHours * 60;
    if (timeMinutes > 60) {
      let hours = Math.floor(timeMinutes / 60);
      let remainingMinutes = Math.round(timeMinutes % 60);
      return hours + "-" + (hours + 1) + "hr";
    } else {
      return (
        Math.round(timeMinutes) + "-" + (Math.round(timeMinutes) + 3) + "min"
      );
    }
  }
  const time = metersToTime(distance, 40);
  const navigation = useNavigation();
  return (
    <View className="bg-white p-3 rounded-3xl shadow-xl mb-2 mx-2">
      <View className="flex-row p-3">
        <View>
          <Image
            className="rounded-3xl"
            style={{ height: 80, width: 80 }}
            source={{ uri: req.bid_by.image }}
          />
        </View>
        <View className="flex flex-1">
          <View className="pl-4 mt-5">
            <Text className="text-[22px] mb-1 tracking-wider">
              {req.bid_by.name}
            </Text>
            <View className="flex-row ">
              <StarIcon size="20" color="orange" />
              <StarIcon size="20" color="orange" />
              <StarIcon size="20" color="orange" />
              <StarIcon size="20" color="orange" />
            </View>
          </View>
          <View className="flex-row pl-3 justify-between items-center">
            <Text className="text-gray-700 text-lg font-bold"></Text>
          </View>
        </View>
        <View>
          <Text className="text-2xl font-bold">RS {req.bid_price}</Text>
          <Text className="text-lg ml-6 ">
            {(distance / 1000).toFixed(1)} KM
          </Text>
          <Text className="text-lg ml-6 ">{time}</Text>
        </View>
      </View>

      <View className="flex-row gap-2 justify-end pr-2 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-1 rounded-md"
          style={{
            borderWidth: 1,
            borderColor: Colors.resprimary,
            width: 150,
            height: 42,
          }}
        >
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginTop: 3,
              fontSize: 18,
            }}
            className="tracking-wider"
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AcceptBid", { item: req, time, post })
          }
          className="p-1 rounded-md"
          style={{ backgroundColor: Colors.resprimary, width: 150, height: 40 }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 3,
              fontSize: 18,
            }}
            className="tracking-wider"
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
