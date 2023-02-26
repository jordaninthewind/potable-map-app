import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Loader from "./src/components/Loader.js";
import MenuGroup from "./src/components/MenuGroup.js";
import ModalInterface from "./src/components/ModalInterface.js";
import NotificationOverlay from "./src/components/NotificationOverlay.js";
import PotableMap from "./src/components/PotableMap.js";

import store from "./src/store.js";
import "./firebaseConfig";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <PotableMap />
        <MenuGroup />
        <ModalInterface />
        <NotificationOverlay />
        <Loader />
      </SafeAreaProvider>
    </Provider>
  );
}
