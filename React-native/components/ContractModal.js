import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

export default function CustomModal({
  isOpen,
  setIsOpen,
  resName,
  supName,
  startDate = "",
  endDate = "",
  details,
  terms,
}) {
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isOpen}>
        <View className="bg-white rounded-md relative">
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="absolute right-1 top-1 right-2"
            style={{ zIndex: 1 }}
          >
            <AntDesign name="closecircleo" size={30} color="red" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              className="flex-1 bg-white m-6 right-7"
              style={{ borderRadius: 50 }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
                className="text-center text-black mb-5"
              >
                Contract Form
              </Text>

              <View
                className="flex p-3 border-black "
                style={{
                  width: 400,
                  borderWidth: 1,
                  marginLeft: 20,
                }}
              >
                <Text style={{ fontSize: 16 }} className="text-black ml-1 mb-2">
                  Restaurant Name
                </Text>
                <Text className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5">
                  {resName}
                </Text>
                <Text style={{ fontSize: 16 }} className="text-black ml-1 mb-2">
                  Supplier Name
                </Text>
                <Text className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5">
                  {supName}
                </Text>
                <View className="flex-row">
                  <View>
                    <Text
                      style={{ fontSize: 16 }}
                      className="text-black ml-1 mb-2"
                    >
                      Contract Start Date
                    </Text>
                    <Text
                      style={{ width: 170 }}
                      className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    >
                      {startDate}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{ fontSize: 16 }}
                      className="text-black ml-8 mb-2"
                    >
                      Contract End Date
                    </Text>
                    <Text
                      style={{ width: 170 }}
                      className="p-2 ml-8 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    >
                      {endDate}
                    </Text>
                  </View>
                </View>

                <View
                  className="flex p-3 border-black "
                  style={{
                    width: 360,
                    borderWidth: 1,
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ fontSize: 18 }} className="text-black ml-1">
                    Contract Details
                  </Text>
                  <Text className="p-2 bg-gray-100 text-black rounded-2xl text-justify">
                    {details}
                  </Text>

                  <Text style={{ fontSize: 18 }} className="text-black ml-1">
                    Terms & Conditions
                  </Text>
                  <View
                    multiline
                    numberOfLines={8}
                    className="p-2 bg-gray-100 text-black rounded-2xl"
                  >
                    <Text>{terms}</Text>
                  </View>
                </View>

                <View className="flex-row mt-12">
                  <View>
                    <Text style={{ fontSize: 16 }} className="text-black ml-1">
                      Restaurant signature
                    </Text>
                    <Text className="ml-14 mt-5">{resName.split(" ")[0]}</Text>
                    <Text
                      style={{ fontSize: 16 }}
                      className="text-black mt-1 ml-1"
                    >
                      ____________________
                    </Text>
                  </View>

                  <View>
                    <Text style={{ fontSize: 16 }} className="text-black ml-12">
                      Supplier signature
                    </Text>
                    <Text
                      style={{ fontSize: 16 }}
                      className="text-black mt-10 ml-12"
                    >
                      ___________________
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
