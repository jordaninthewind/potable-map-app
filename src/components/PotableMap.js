import { useEffect, useRef } from "react";
import { useColorScheme, StyleSheet, Vibration } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  addMarker,
  selectMarkers,
  setMarkers,
} from "../features/markers/markersSlice";
import {
  addPinRemote,
  getLocalPins,
  requestLocationPermission,
} from "../services/services";

import MarkerCallout from "./MarkerCallout";

const PotableMap = () => {
  const dispatch = useDispatch();

  const markers = useSelector(selectMarkers);
  const colorScheme = useColorScheme();
  const mapRef = useRef(null);

  // const [, setLocation] = useState(DEFAULT_REGION);

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
        dispatch(setError(error));
      }
    };

    init();
  }, []);

  const updateLocation = () => {
    dispatch(setLoading(true));

    getCurrentPosition()
      .then((loc) => {
        dispatch(setLocation(loc));
      })
      .catch((e) => {
        dispatch(setError(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const addPin = ({ nativeEvent }) => {
    Vibration.vibrate();

    addPinRemote({
      location: nativeEvent.coordinate,
      title: "New Pin",
      user_id: "1",
    });

    dispatch(addMarker(nativeEvent.coordinate));
  };

  useEffect(() => {
    getLocalPins().then((pins) => {
      dispatch(setMarkers(pins));
    });
  }, []);

  const onMove = () => {
    console.log("onMove");
    mapRef.current?.animateCamera({
      center: location,
      pitch: 0,
      heading: 0,
      altitude: 1000,
      zoom: 15,
    });
  };

  return (
    <MapView
      ref={mapRef}
      onLongPress={addPin}
      onRegionChangeComplete={onMove}
      region={location}
      provider="google"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      showsTraffic={true}
      style={styles.map}
      userInterfaceStyle={colorScheme}
    >
      {markers?.map((marker, index) => {
        return (
          <Marker
            key={`pin${index}`}
            coordinate={marker.location}
            calloutVisible={true}
          >
            <MarkerCallout marker={marker} />
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  callout: {
    padding: 30,
  },
  map: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
});

export default PotableMap;
