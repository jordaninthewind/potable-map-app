import { useEffect, useRef } from "react";
import { StyleSheet, Vibration } from "react-native";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import {
  selectMarkers,
  setTempMarker,
  selectLocation,
  setSelectedMarker,
  selectSelectedMarker,
  selectTempMarker,
} from "../features/markers/markersSlice";
import { getLocalMarkers } from "../services/services";
import { setModal } from "../features/modal/modalSlice";
import { selectTheme } from "../features/app/appSlice";

import { PotableMarker } from "./PotableMarker";

const PotableMap = () => {
  const mapRef = useRef(null);

  const dispatch = useDispatch();
  const darkMode = useSelector(selectTheme);

  const markers = useSelector(selectMarkers);
  const location = useSelector(selectLocation);
  const selectedMarker = useSelector(selectSelectedMarker);
  const tempMarker = useSelector(selectTempMarker);

  useEffect(() => {
    if (selectedMarker) {
      const location = {
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      mapRef.current.animateToRegion(location, 1000);
    }
  }, [selectedMarker]);

  const openAddMarkerScreen = ({ nativeEvent }) => {
    Vibration.vibrate();
    dispatch(setTempMarker(nativeEvent.coordinate));

    dispatch(setSelectedMarker(nativeEvent.coordinate));
    dispatch(setModal("addMarker"));
  };

  useEffect(() => {
    dispatch(getLocalMarkers());
  }, []);

  // const updateMarkerLocation = ({ nativeEvent, marker }) => {
  //   console.log("updateMarkerLocation", nativeEvent);

  //   updateMarkerLocation;
  // };

  const onMove = () => {
    console.log("onMove");
  };

  return (
    <MapView
      ref={mapRef}
      onLongPress={openAddMarkerScreen}
      onRegionChangeComplete={onMove}
      userInterfaceStyle={darkMode}
      region={location}
      showsPointsOfInterest={false}
      showsUserLocation={true}
      style={styles.map}
    >
      {markers?.map((marker, index) => {
        return (
          <PotableMarker
            key={index}
            marker={marker}
            selectedId={selectedMarker?.id}
          />
        );
      })}
      {tempMarker && <PotableMarker marker={tempMarker} type={"temp"} />}
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
  marker: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "blue",
    height: 10,
    width: 10,
  },
});

export default PotableMap;
