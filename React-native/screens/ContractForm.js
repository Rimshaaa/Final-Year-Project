import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyHeader2 from "../components/MyHeader2";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateContract } from "../redux/globalSlice";
import Toast from "react-native-toast-message";

export default function ContractForm({ route }) {
  const {
    receiptId = "",
    receiptName = "",
    receiptImage = "",
    prevScreen = "",
  } = route.params || {};

  const user = useSelector((state) => state.authReducer.activeUser);
  const { contractTerms, contractDetails } = useSelector(
    (state) => state.global
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [terms, setTerms] = useState(contractTerms);
  const [details, setDetails] = useState(contractDetails);
  const [ContractForm, setContractForm] = useState({
    resName: user?.name,
    supName: receiptName,
    startDate: moment().format("DD-MM-YYYY"),
    endDate: "",
    resSign: user?.name,
    supSign: "",
  });

  function handlePressSend() {
    if (prevScreen === "item") {
      navigation.navigate("ChattingScreen", {
        recepientId: receiptId,
        recepientName: receiptName,
        recepientImage: receiptImage,
        prevScreen: "contract",
        endDate: ContractForm.endDate,
        startDate: ContractForm.startDate,
      });
    } else if (prevScreen === "profile") {
      navigation.navigate("ResChats", {
        prevScreen: "profile",
        startDate: ContractForm.startDate,
        endDate: ContractForm.endDate,
      });
    }
  }
// return portion 
  return (
    <View className="flex-1 bg-white">
      <MyHeader2
        back
        onPressBack={() => navigation.goBack()}
        title="Contract Form"
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
            style={{ fontSize: 26, fontWeight: "bold", marginBottom: 40 }}
            className="text-center text-black mb-5"
          >
            Contract Form
          </Text>

          <View
            className="flex p-3 border-black "
            style={{ width: 440, borderWidth: 1, marginLeft: 20 }}
          >
            <Text style={{ fontSize: 16 }} className="text-black ml-1">
              Restaurant Name
            </Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              placeholder="Enter Name"
              value={ContractForm.resName}
              onChange={(value) =>
                setContractForm({ ...ContractForm, resName: value })
              }
            />
            <Text style={{ fontSize: 16 }} className="text-black ml-1">
              Supplier Name
            </Text>
            <TextInput
              className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              placeholder="Enter Name"
              value={ContractForm.supName}
              onChange={(value) =>
                setContractForm({ ...ContractForm, supName: value })
              }
            />
            <View className="flex-row">
              <View>
                <Text style={{ fontSize: 16 }} className="text-black ml-1">
                  Contract Start Date
                </Text>
                <TextInput
                  className="p-2 w-48 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                  placeholder="Start Date"
                  value={ContractForm.startDate}
                  onChange={(value) =>
                    setContractForm({ ...ContractForm, startDate: value })
                  }
                />
              </View>

              <View>
                <Text style={{ fontSize: 16 }} className="text-black ml-8">
                  Contract End Date
                </Text>
                <TextInput
                  className="p-2 ml-8 w-48 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                  placeholder="End Date"
                  value={ContractForm.endDate}
                  onChangeText={(value) =>
                    setContractForm({ ...ContractForm, endDate: value })
                  }
                />
              </View>
            </View>

            <Text style={{ fontSize: 18 }} className="text-black ml-1">
              Contract Details
            </Text>
            <View
              className="flex p-3 border-black "
              style={{ width: 400, borderWidth: 1, marginLeft: 5 }}
            >
              <TextInput
                multiline
                numberOfLines={8}
                className="p-2 bg-gray-100 text-black rounded-2xl"
                value={details}
                onChangeText={(value) => setDetails(value)}
              />

              <Text style={{ fontSize: 18 }} className="text-black ml-1">
                Terms & Conditions
              </Text>
              <TextInput
                multiline
                numberOfLines={8}
                className="p-2 bg-gray-100 text-black rounded-2xl"
                value={terms}
                onChangeText={(value) => setTerms(value)}
              />
            </View>

            <View className="flex-row mt-12">
              <View>
                <Text style={{ fontSize: 16 }} className="text-black ml-1">
                  Restaurant signature
                </Text>
                <Text
                  style={{ fontSize: 16 }}
                  className="text-black mt-10 ml-10"
                >
                  {ContractForm.resSign.split(" ")[0]}
                </Text>
                <Text style={{ fontSize: 16 }} className="text-black ml-1">
                  ____________________
                </Text>
              </View>

              <View>
                <Text style={{ fontSize: 16 }} className="text-black ml-28">
                  Supplier signature
                </Text>
                <Text style={{ fontSize: 16 }} className="text-blackml-10">
                  {ContractForm.supSign?.split(" ")[0]}
                </Text>
                <Text
                  style={{ fontSize: 16 }}
                  className="text-black mt-10 ml-28"
                >
                  ___________________
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-end" style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  updateContract({
                    contractDetails: details,
                    contractTerms: terms,
                  })
                );
                Toast.show({
                  type: "success",
                  text1: "Contract Updated !",
                });
              }}
              className=" bg-purple-500 rounded-xl items-center"
              style={{
                marginTop: 20,
                marginBottom: 20,
                width: 150,
              }}
            >
              <Text className="font-xl font-bold text-center text-white mt-2 mb-2">
                Update Contract
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePressSend()}
              className=" bg-purple-500 rounded-xl items-center"
              style={{
                marginTop: 20,
                marginBottom: 20,
                width: 150,
                marginRight: 20,
              }}
            >
              <Text className="font-xl font-bold text-center text-white mt-2 mb-2">
                Send Contract
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
