import { useEffect, useRef } from "react";
import { StyleSheet, Vibration } from "react-native";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import {
  selectMarkers,
  setTempMarker,
  selectLocation,
  selectSelectedMarker,
  selectTempMarker,
  resetSelectedMarker,
  resetTempMarker,
} from "../features/markers/markersSlice";
import { getLocalMarkers } from "../services/services";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { selectTheme } from "../features/app/appSlice";

import { PotableMarker } from "./PotableMarker";
import { centerMarkerInScreen } from "../helpers";

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
      const selectedlocation = {
        latitude: centerMarkerInScreen(selectedMarker.latitude),
        longitude: selectedMarker.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };

      mapRef.current.animateToRegion(selectedlocation, 750);
    } else if (tempMarker) {
      const tempLocation = {
        latitude: centerMarkerInScreen(tempMarker.latitude),
        longitude: tempMarker.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };

      mapRef.current.animateToRegion(tempLocation, 1000);
    } else {
      mapRef.current.animateToRegion(location, 750);
    }
  }, [selectedMarker, tempMarker]);

  useEffect(() => {}, [tempMarker]);

  const openAddMarkerScreen = ({ nativeEvent }) => {
    Vibration.vibrate();

    dispatch(resetSelectedMarker());
    dispatch(setTempMarker(nativeEvent.coordinate));
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

  const handleMapPress = async () => {
    if (selectedMarker) {
      await dispatch(clearModal());
      dispatch(resetSelectedMarker());
    }

    if (tempMarker) {
      await dispatch(clearModal());
      dispatch(resetTempMarker());
    }
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
      onPress={handleMapPress}
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
  map: {
    height: "100%",
  },
});

export default PotableMap;
