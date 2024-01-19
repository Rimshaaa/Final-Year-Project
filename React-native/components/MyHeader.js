import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Badge, Surface, Text, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import CustomDrawer from "./customDrawer";

import { Sidebar } from "react-native-feather";
import { api, useGetUnreadMessagesQuery } from "../redux/services";
import { useDispatch } from "react-redux";

const IconSize = 24;

const AppHeader = ({
  style,
  menu,
  Sidebar,
  onPressMenu,
  back,
  onPressBack,
  title,
  right,
  rightComponent,
  onRightPress,
  optionalBtn,
  optionalBtnPress,
  headerBg = Colors.primary,
  iconColor = "black",
  titleAlight,
  optionalBadge,
  navigation = useNavigation(),
}) => {
  const { data, isFetching } = useGetUnreadMessagesQuery();
  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={navigation.openDrawer()}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {Sidebar && (
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
  const RightView = () =>
    rightComponent ? (
      rightComponent
    ) : (
      <View style={[styles.view, styles.rightView]}>
        {optionalBtn && (
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => navigation.navigate("supChats")}
          >
            <Feather name="message-square" size={IconSize} color={iconColor} />

            {/* {data && (
              <Badge
                style={{
                  position: "absolute",
                  top: -5,
                  right: -10,
                  backgroundColor: "white",
                  color: "black",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {data}
              </Badge>
            )} */}
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "white",
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 16,
                left: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {data && data}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* {right !== "" && (
          <TouchableOpacity onPress={() => {}}>
            <Feather name={right} size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )} */}
      </View>
    );
  const TitleView = () => (
    <View style={styles.titleView}>
      <Title style={{ color: iconColor, textAlign: titleAlight }}>
        {title}
      </Title>
    </View>
  );
  return (
    <Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 80,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  view: {
    marginHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  titleView: {
    flex: 1,
  },
  rightView: {
    justifyContent: "flex-end",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
});
