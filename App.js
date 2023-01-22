import { useEffect, useState } from "react";
import { StyleSheet, Vibration } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import {
  addPinRemote,
  getCurrentPosition,
  getLocalPins,
  requestLocationPermission,
} from "./src/services/services.js";
import DEFAULT_REGION from "./src/constants.js";

import Logo from "./src/components/Logo.js";
import MenuGroup from "./src/components/MenuGroup.js";
import NotificationOverlay from "./src/components/NotificationOverlay.js";
import PotableMap from "./src/components/PotableMap.js";
import UserInfo from "./src/components/UserInfo.js";
import ModalInterface from "./src/components/ModalInterface.js";
import Loader from "./src/components/Loader.js";

export default function App() {
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

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

    getLocalPins()
      .then((pins) => {
        setMarkers(pins);
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
    Vibration.vibrate();

    addPinRemote({
      location: nativeEvent.coordinate,
      title: "New Pin",
      user_id: "1",
    });

    setMarkers(
      markers ? [...markers, nativeEvent.coordinate] : [nativeEvent.coordinate]
    );
  };

  const resetError = () => {
    setError(null);
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  const moveMap = (event) => {
    console.log(event);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <UserInfo />
        <PotableMap
          addPin={addPin}
          location={location}
          markers={markers}
          onMove={moveMap}
        />
        <Logo />
        <MenuGroup
          loading={loading}
          updateLocation={updateLocation}
          openModal={() => setModalIsVisible(true)}
        />
        <ModalInterface onDismiss={closeModal} visible={modalIsVisible} />
        <NotificationOverlay error={error} resetError={resetError} />
        <Loader loading={loading} />
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
