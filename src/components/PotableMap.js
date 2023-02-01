import { useEffect, useRef } from "react";
import { useColorScheme, StyleSheet, Vibration } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import MarkerCallout from "./MarkerCallout";
import {
  addMarker,
  selectMarkers,
  setMarkers,
  selectLocation,
} from "../features/markers/markersSlice";
import { setError } from "../features/error/errorSlice";
import {
  addPinRemote,
  getCurrentPosition,
  getLocalPins,
  requestLocationPermission,
} from "../services/services";

const PotableMap = () => {
  const mapRef = useRef(null);

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const markers = useSelector(selectMarkers);
  const location = useSelector(selectLocation);

  useEffect(() => {
    const init = async () => {
      try {
        const permission = await requestLocationPermission();

        if (permission === "granted") {
          await updateLocation();
        } else {
          throw new Error("Location permission not granted");
        }
      } catch (error) {
        dispatch(setError(error));
      }
    };

    init();
  }, []);

  useEffect(() => {
    const updateLocation = async () => {
      dispatch(setLoading(true));

      try {
        const position = await getCurrentPosition();

        dispatch(setLocation(position));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    };

    updateLocation();
  }, []);

  useEffect(() => {
    console.log("location", location);
    if (mapRef.current) {
      mapRef.current.animateToRegion(location, 1000);
    }
    //   mapRef.current?.animateCamera({
    //     center: location,
    //     pitch: 0,
    //     heading: 0,
    //     altitude: 1000,
    //     zoom: 15,
    //   });
  }, [location]);

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
    const getMarkers = async () => {
      const pins = await getLocalPins();

      dispatch(setMarkers(pins));
    };

    getMarkers();
  }, []);

  const onMove = () => {
    console.log("onMove");
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
