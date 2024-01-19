import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <Feather
          name="check-circle"
          size={34}
          color="white"
          style={{ marginTop: 12, marginLeft: 30 }}
        />
      )}
      style={{
        borderLeftColor: "green",
        backgroundColor: "green",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 1 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
        color: "white",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "700",
        color: "white",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      renderLeadingIcon={() => (
        <MaterialIcons
          name="error-outline"
          size={34}
          color="white"
          style={{ marginTop: 12, marginLeft: 30 }}
        />
      )}
      style={{ backgroundColor: "#e11d48" }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
        color: "white",
      }}
      text2Style={{
        fontSize: 13,
        color: "white",
      }}
    />
  ),
  pending: (props) => (
    <BaseToast
      {...props}
      renderLeadingIcon={() => (
        <MaterialCommunityIcons
          name="timer-sand-empty"
          size={34}
          color="white"
          style={{ marginTop: 12, marginLeft: 30 }}
        />
      )}
      style={{
        borderLeftColor: "blue",
        backgroundColor: "blue",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 1 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "700",
        color: "white",
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: "700",
        color: "white",
      }}
    />
  ),
};
