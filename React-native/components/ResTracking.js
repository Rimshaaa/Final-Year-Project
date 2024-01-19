import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { getOrderStatusColor } from "../utils";
import AnimatedButton from "./AnimatedButton";
import {
  useAddRatingMutation,
  useUpdateOrderMutation,
} from "../redux/services";
import Toast from "react-native-toast-message";
import Loader from "./Loader";
import Colors from "../constants/Colors";
import RatingModal from "../components/RatingModal";

export default function ResTracking({ track }) {
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const [selectedItem, setSelectedItem] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ratingValue, setRatingValue] = useState();

  const [addRating] = useAddRatingMutation();

  const handleRating = () => {
    addRating({
      id: track.sender._id,
      data: { rating: parseFloat(ratingValue) },
    });
  };

  return (
    <View className="flex">
      <View className="flex-row justify-between items-center space-x-5 mb-4 h-20 bg-gray-200 rounded-full">
        <View className="flex-1 ml-10">
          <Text
            style={{ color: themeColors.text }}
            className=" text-base font-bold"
          >
            {`${track.item_name} ${track.qty} ${track.unit || ""} From ${
              track.receiver.name
            }  `}
          </Text>
        </View>
        <RatingModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          setRatingValue={setRatingValue}
          handleConfirm={handleRating}
        />
        <View className="flex-row mr-5">
          {track.status !== "dispatched" ? (
            <View
              className="p-2 h-10 w-24 items-center rounded-lg"
              style={getOrderStatusColor(track.status)}
            >
              <Text
                className="text-black font-semibold"
                style={{ textTransform: "capitalize" }}
              >
                {track.status}
              </Text>
            </View>
          ) : selectedItem === track._id && updateLoading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 30,
              }}
            >
              <Loader color={Colors.resprimary} />
            </View>
          ) : (
            <AnimatedButton
              updateOrder={updateOrder}
              id={track._id}
              text={track.status}
              setSelectedItem={setSelectedItem}
              setIsOpen={setOpenModal}
            />
          )}
        </View>
      </View>
    </View>
  );
}
