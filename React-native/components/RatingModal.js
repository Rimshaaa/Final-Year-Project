import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Rating } from "react-native-ratings";
import Colors from "../constants/Colors";

export default function CustomModal({
  isOpen,
  setIsOpen,
  handleConfirm,
  setRatingValue,
}) {
  function handlePress() {
    handleConfirm();
    setIsOpen(false);
  }
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isOpen}>
        <View className="flex items-center bg-white pt-8 pb-12 rounded-md">
          <Text className="font-bold text-2xl tracking-widest mb-2">
            Give Feedback
          </Text>
          <Text className="text-lg ">
            How was your experience with supplier ?
          </Text>
          <Text className="text-lg mb-8">Rate the supplier</Text>
          <Rating
            count={5}
            defaultRating={5}
            size={30}
            reviewSize={20}
            onFinishRating={(value) => setRatingValue(value)}
            fractions={1}
          />
          <View className="flex-row mt-5">
            <TouchableOpacity
              className="py-2 ml-5 rounded-full w-32 mt-5"
              style={{ borderWidth: 1, borderColor: "#f59e0b" }}
              onPress={() => setIsOpen(false)}
            >
              <Text className="text-lg text-center text-gray-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2 ml-5 rounded-full w-32 mt-5"
              style={{ backgroundColor: Colors.resprimary }}
              onPress={handlePress}
            >
              <Text className="text-lg text-center text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
