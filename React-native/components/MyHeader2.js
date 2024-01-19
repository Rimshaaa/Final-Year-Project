import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Badge, Surface, Text, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { useSelector } from "react-redux";
import { useGetUnreadMessagesQuery } from "../redux/services";

const IconSize = 24;

const AppHeader = ({
  style,
  menu,
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
  iconColor = "white",
  titleAlight,
  optionalBadge,
}) => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cartSlice.cart);
  const { data, isFetching } = useGetUnreadMessagesQuery();

  const LeftView = () => (
    <View style={styles.view}>
      {menu && (
        <TouchableOpacity onPress={""}>
          <Feather name="menu" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
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
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
            onPress={() => navigation.navigate("ResChats")}
          >
            <Feather name="message-square" size={IconSize} color={iconColor} />

            <Badge
              style={{
                position: "absolute",
                top: -5,
                right: -10,
                backgroundColor: "white",
                color: "black",
                fontSize: 15,
              }}
            >
              {data ? data : 0}
            </Badge>
          </TouchableOpacity>
        )}

        {optionalBtn && (
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => navigation.navigate("CartScreen")}
          >
            <Feather name={optionalBtn} size={IconSize} color={iconColor} />

            <Badge
              style={{
                position: "absolute",
                top: -5,
                right: -10,
                backgroundColor: "white",
                color: "black",
                fontSize: 15,
              }}
            >
              {cart.length}
            </Badge>
          </TouchableOpacity>
        )}
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
    <Surface
      style={[styles.header, style, { backgroundColor: themeColors.resbg }]}
    >
      <LeftView />
      <TitleView />
      <RightView />
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: themeColors.resbg,
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
