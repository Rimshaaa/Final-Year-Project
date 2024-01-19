import AppNavigation from "./navigation/appNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
import Toast from "react-native-toast-message";
import { toastConfig } from "./configs/ToastConfig";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}
