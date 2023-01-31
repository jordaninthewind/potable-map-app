import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import store from "./src/store.js";
import { AppStateContext } from "./src/contexts.js";

import Logo from "./src/components/Logo.js";
import MenuGroup from "./src/components/MenuGroup.js";
import NotificationOverlay from "./src/components/NotificationOverlay.js";
import PotableMap from "./src/components/PotableMap.js";
import UserInfo from "./src/components/UserInfo.js";
import ModalInterface from "./src/components/ModalInterface.js";
import Loader from "./src/components/Loader.js";

// import { useAuth } from "./src/hooks.js";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AppStateContext.Provider value={AppStateContext}>
            <StatusBar style="auto" />
            <UserInfo />
            <PotableMap />
            <Logo />
            <MenuGroup />
            <ModalInterface />
            <NotificationOverlay />
            <Loader />
          </AppStateContext.Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
