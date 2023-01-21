import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  getCurrentPosition,
  getLocalPins,
  requestLocationPermission,
} from "./src/services/services.js";
import DEFAULT_REGION from "./src/constants.js";

import Logo from "./src/components/Logo.js";
import MenuGroup from "./src/components/MenuGroup.js";
import PotableMap from "./src/components/PotableMap.js";
import StatusBar from "./src/components/StatusBar.js";
import NotificationOverlay from "./src/components/NotificationOverlay.js";

export default function App() {
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    requestLocationPermission()
      .then((permission) => {
        if (permission === "granted") {
          updateLocation();
        } else {
          setError("Permission to access location was denied");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const updateLocation = () => {
    setLoading(true);

    getCurrentPosition()
      .then((loc) => setLocation(loc))
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addPin = ({ nativeEvent }) => {
    setMarkers([...markers, nativeEvent.coordinate]);
  };

  const moveMap = (event) => {
    console.log(event);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Logo />
        <StatusBar />
        <PotableMap
          location={location}
          markers={markers}
          addPin={addPin}
          onMove={moveMap}
        />
        <MenuGroup loading={loading} updateLocation={updateLocation} />
        <NotificationOverlay setError={setError} error={error} />
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
