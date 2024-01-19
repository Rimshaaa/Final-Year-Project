import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

const LowItemsModal = ({ isOpen, setIsOpen, data }) => {
  return (
    <View>
      <Modal isVisible={isOpen}>
        <View style={{ height: 300, borderRadius: 10 }}>
          <ScrollView style={{ backgroundColor: "white" }}>
            <TouchableOpacity
              style={{ position: "absolute", top: 3, right: 10 }}
              onPress={setIsOpen}
            >
              <AntDesign name="closecircleo" size={24} color="red" />
            </TouchableOpacity>
            <View style={{ marginTop: 30 }}>
              <Text className="text-center text-xl tracking-wider mb-4">
                Low Items
              </Text>
              {data?.map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between px-20 border border-gray-300 mx-2 mb-3"
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ fontSize: 17 }}>{item.name}</Text>
                  <View className="flex-row items-center">
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "red",
                        marginRight: 10,
                      }}
                    >
                      QTY:
                    </Text>
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", color: "red" }}
                    >
                      {item.qty}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default LowItemsModal;
