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
import { AppStateContext } from "./src/contexts.js";
import DEFAULT_REGION from "./src/constants.js";

import Logo from "./src/components/Logo.js";
import MenuGroup from "./src/components/MenuGroup.js";
import NotificationOverlay from "./src/components/NotificationOverlay.js";
import PotableMap from "./src/components/PotableMap.js";
import UserInfo from "./src/components/UserInfo.js";
import ModalInterface from "./src/components/ModalInterface.js";
import Loader from "./src/components/Loader.js";
// import { useAuth } from "./src/hooks.js";

export default function App() {
  const [location, setLocation] = useState(DEFAULT_REGION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // const { user, login, logout } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const permission = await requestLocationPermission();

        if (permission === "granted") {
          updateLocation();
        } else {
          throw new Error("Location permission not granted");
        }
      } catch (error) {
        setError(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    getLocalPins().then((pins) => {
      setMarkers(pins);
    });
  }, []);

  const updateLocation = () => {
    setLoading(true);

    getCurrentPosition()
      .then((loc) => {
        setLocation(loc);
      })
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
        <AppStateContext.Provider value={AppStateContext}>
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
        </AppStateContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
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
