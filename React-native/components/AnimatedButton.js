import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

const MovingButton = ({
  text,
  id,
  updateOrder,
  setSelectedItem,
  setIsOpen,
}) => {
  const translateYValue = useRef(new Animated.Value(0)).current;

  const startMovingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYValue, {
          toValue: -10,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateYValue, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startMovingAnimation();
  }, []);

  const handleUpdate = async (recId) => {
    setSelectedItem(recId);
    updateOrder({ id: recId, data: { status: "received" } })
      .then((res) => {
        if (res.error) {
          Toast.show({ type: "error", text1: res.error });
        } else if (res.data.message) {
          setIsOpen(true);
          // Toast.show({ type: "success", text1: "Order Accepted" });
        }
      })
      .catch((err) => Toast.show({ type: "error", text1: err.message }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleUpdate(id)} style={styles.button}>
        <Animated.View style={{ transform: [{ translateY: translateYValue }] }}>
          <Text style={styles.buttonText}>Delivered</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
  },
});

export default MovingButton;
