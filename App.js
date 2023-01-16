import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";

import { AppMap } from "./src/components/AppMap.js";
import { MainButton } from "./src/components/MainButton.js";
import { MapAppBottomNavigation } from "./src/components/MapAppBottomNavigation.js";
import * as services from "./src/services.js";
import DEFAULT_REGION from "./src/constants.js";

export default function App() {
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const updateLocation = () => {
    setLoading(true);

    services
      .getCurrentPosition()
      .then((updatedLocation) => setLocation(updatedLocation))
      .catch((error) => {
        setErrorMsg(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const moveMap = (event) => {
    console.log(event);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AppMap location={location} onMove={moveMap} />
        <MainButton loading={loading} updateLocation={updateLocation} />
        <MapAppBottomNavigation />
        <Snackbar
          visible={!!errorMsg}
          action={{ label: "Dismiss", onPress: () => setErrorMsg(null) }}
          onDismiss={() => setErrorMsg(null)}
        >
          {errorMsg?.toString()}
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
