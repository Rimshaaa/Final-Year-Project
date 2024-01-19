import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

export default function CustomModal({
  isOpen,
  setIsOpen,
  icon,
  text,
  handleConfirm,
}) {
  function handlePress() {
    handleConfirm();
    setIsOpen(false);
  }
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isOpen}>
        <View className="flex items-center bg-white py-8 rounded-md">
          {icon && icon}
          <Text className="text-xl font-semibold text-center mt-2">
            {text}{" "}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="py-1 ml-5 rounded-full w-28 mt-5"
              style={{ borderWidth: 1, borderColor: "#f59e0b" }}
              onPress={() => setIsOpen(false)}
            >
              <Text className="text-lg text-center text-gray-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-1 ml-5 bg-amber-500 rounded-full w-28 mt-5"
              onPress={handlePress}
            >
              <Text className="text-lg text-center text-gray-700">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
