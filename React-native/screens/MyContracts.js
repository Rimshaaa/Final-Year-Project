import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Contracts, COLOURS } from "../components/items";
import MyHeader from "../components/MyHeader";
import {
  useGetContractsQuery,
  useUpdateContractMutation,
} from "../redux/services";
import SuppliersList from "../common/Placeholders/SuppliersList";
import Empty from "../components/Empty";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ContractModal from "../components/ContractModal";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

const MyContracts = ({ navigation }) => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const [openContract, setOpenContract] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const { data, isFetching } = useGetContractsQuery();
  const [updateContract, { isLoading: updateLoading }] =
    useUpdateContractMutation();

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    rejected: 0,
    accepted: 0,
  });

  useEffect(() => {
    const countStatus = () => {
      let pendingCount = 0;
      let rejectedCount = 0;
      let acceptedCount = 0;
      data &&
        data.forEach((item) => {
          switch (item.status) {
            case "pending":
              pendingCount += 1;
              break;
            case "rejected":
              rejectedCount += 1;
              break;
            case "accepted":
              acceptedCount += 1;
              break;
            default:
              break;
          }
        });
      return {
        pending: pendingCount,
        rejected: rejectedCount,
        accepted: acceptedCount,
      };
    };
    setStatusCounts(countStatus());
  }, [data]);

  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}
      >
        <View
          style={{
            width: 100,
            height: 50,
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "600",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data, index) => {
    if (currentSelected === 0) {
      if (data.status === "pending") {
        return (
          <View
            key={data._id}
            activeOpacity={0.9}
            style={{
              width: "100%",
              height: 180,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                height: 170,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
                elevation: 4,
                position: "relative",
                padding: 15,
                flexDirection: "column",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View className="flex-row">
                  <View style={{ width: 70, height: 70, marginRight: -45 }}>
                    <Image
                      source={{ uri: data.sender.image }}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: "bold",
                        paddingTop: 10,
                        marginLeft: 100,
                      }}
                    >
                      {data.sender.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start Date:
                      {data.startDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start End:
                      {data.endDate}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 20,
                    marginTop: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setOpenContract(true)}
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: Colors.primaryAmber,
                      padding: 3,
                    }}
                  >
                    <AntDesign name="eyeo" size={30} color="black" />
                    <ContractModal
                      isOpen={openContract}
                      setIsOpen={setOpenContract}
                      details={data.details}
                      terms={data.terms}
                      resName={data.sender.name}
                      supName={data.receiver.name}
                      startDate={data.startDate}
                      endDate={data.endDate}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedItem({ name: "accept", _id: data._id });
                      handleAccept(data._id);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: Colors.primaryAmber,
                      padding: 3,
                    }}
                  >
                    {updateLoading &&
                    data._id === selectedItem._id &&
                    selectedItem.name === "accept" ? (
                      <View className="mt-4">
                        <Loader color={Colors.primaryAmber} />
                      </View>
                    ) : (
                      <AntDesign name="check" size={30} color="green" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedItem({ name: "reject", _id: data._id });
                      handleReject(data._id);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: Colors.primaryAmber,
                      padding: 3,
                    }}
                  >
                    {updateLoading &&
                    data._id === selectedItem._id &&
                    selectedItem.name === "reject" ? (
                      <View className="mt-4">
                        <Loader color={Colors.primaryAmber} />
                      </View>
                    ) : (
                      <AntDesign name="close" size={30} color="red" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }

    if (currentSelected === 1) {
      if (data.status === "accepted") {
        return (
          <View
            key={data._id}
            activeOpacity={0.9}
            style={{
              width: "100%",
              height: 160,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                height: 150,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
                elevation: 4,
                position: "relative",
                padding: 15,
                flexDirection: "column",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View className="flex-row">
                  <View style={{ width: 70, height: 70, marginRight: -45 }}>
                    <Image
                      source={{ uri: data.sender.image }}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: "bold",
                        paddingTop: 10,
                        marginLeft: 100,
                      }}
                    >
                      {data.sender.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start Date:
                      {data.startDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start End:
                      {data.endDate}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    if (currentSelected === 2) {
      if (data.status === "rejected") {
        return (
          <View
            key={data._id}
            activeOpacity={0.9}
            style={{
              width: "100%",
              height: 160,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: "90%",
                height: 150,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
                elevation: 4,
                position: "relative",
                padding: 15,
                flexDirection: "column",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View className="flex-row">
                  <View style={{ width: 70, height: 70, marginRight: -45 }}>
                    <Image
                      source={{ uri: data.sender.image }}
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLOURS.black,
                        fontWeight: "bold",
                        paddingTop: 10,
                        marginLeft: 100,
                      }}
                    >
                      {data.sender.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start Date:
                      {data.startDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLOURS.black,
                        opacity: 0.5,
                        marginLeft: 100,
                      }}
                    >
                      {" "}
                      Start End:
                      {data.endDate}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  const handleAccept = async (id) => {
    updateContract({ id, data: { status: "accepted" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Contract Accepted" });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  const handleReject = async (id) => {
    updateContract({ id, data: { status: "rejected" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          Toast.show({ type: "success", text1: "Contract Rejected" });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLOURS.white,
            position: "relative",
          }}
        >
          <MyHeader
            // Sidebar
            back
            onPressBack={() => navigation.goBack()}
            title="Contracts"
            right="more-vertical"
            optionalBtn="shopping-cart"
            onRightPress={() => console.log("right")}
          />

          <View style={{ alignItems: "center" }}>
            <FlatList
              className="mt-10"
              horizontal={true}
              data={Contracts}
              renderItem={renderCategories}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {isFetching ? (
            <SuppliersList />
          ) : data && data.length > 0 ? (
            data.map(renderItems)
          ) : (
            <Empty />
          )}
          {currentSelected === 0 && statusCounts.pending === 0 && (
            <Empty text="No Contracts Yet" />
          )}
          {currentSelected === 1 && statusCounts.accepted === 0 && (
            <Empty text="No Contracts Yet" />
          )}
          {currentSelected === 2 && statusCounts.rejected === 0 && (
            <Empty text="No Contracts Yet" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyContracts;
