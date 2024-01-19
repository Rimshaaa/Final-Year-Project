import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon, { Icons } from "../components/Icons";
import Colors from "../constants/Colors";
import ColorScreen from "../screens/ColorScreen";
import * as Animatable from "react-native-animatable";
import SupplierDashboard from "../screens/SupplierDashboard";
import SupplierInventory from "../screens/SupplierInventory";
import SupplierStore from "../screens/SupplierStore";
import CreateStore from "../screens/CreateStore";
import MyProfile from "../screens/MyProfile";
import RestaurantRequest from "../screens/RestaurantRequest";
import Profile from "../screens/Profile";
import Store from "../screens/Store";
import { BackHandler } from "react-native";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: SupplierDashboard,
  },
  {
    route: "Search",
    label: "Inventory",
    type: Icons.Feather,
    icon: "clipboard",
    component: SupplierInventory,
  },
  //  { route: 'Add', label: 'Store', type: Icons.Feather, icon: 'archive', component: Store },
  {
    route: "Like",
    label: "Orders",
    type: Icons.FontAwesome5,
    icon: "cart-arrow-down",
    component: RestaurantRequest,
  },
  {
    route: "Account",
    label: "Account",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
    component: Profile,
  },
];

/*const TabArr = [
  { route: 'Home2', label: 'Home', type: Icons.Feather, icon: 'home', component: RestaurantDashboard},
  { route: 'Search2', label: 'Search', type: Icons.Feather, icon: 'search', component: SearchSupplier },
  { route: 'Add2', label: 'Generate Request', type: Icons.Feather, icon: 'plus', component: ColorScreen  },
  { route: 'Like2', label: 'Order History', type: Icons.Feather, icon: 'clipboard', component: OrderHistory },
  { route: 'Account2', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: ResProfile },
];*/

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(item.component);
  const circleRef = useRef(item.component);
  const textRef = useRef(item.component);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab2() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.primary,
  },
});
