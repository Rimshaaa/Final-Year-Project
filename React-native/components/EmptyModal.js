import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

export default function CustomModal({ isOpen, setIsOpen }) {
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isOpen}>
        <View className="flex items-center bg-white py-8 rounded-md">
          <Text className="text-xl font-semibold text-center mt-2">Empty</Text>
        </View>
      </Modal>
    </View>
  );
}
