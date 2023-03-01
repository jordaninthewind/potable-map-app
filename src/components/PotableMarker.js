import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";

import { setSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";

export const PotableMarker = ({ marker, selectedId = null, type = null }) => {
  const dispatch = useDispatch();
  const { latitude, longitude } = marker;

  const openMarkerInfo = () => {
    if (type) return;

    dispatch(setSelectedMarker(marker));
    dispatch(setModal("markerInfo"));
  };

  const updateMarkerLocation = (location) => {
    console.log("location", location);
    console.log("marker", marker.id);
    // const { latitude, longitude } = location.coordinate;
    // const updatedMarker = { ...marker, latitude, longitude };

    // dispatch(setSelectedMarker(updatedMarker));
    // dispatch(setModal("editMarker"));
  };

  return (
    <Marker
      calloutVisible={true}
      coordinate={{ latitude, longitude }}
      draggable
      onPress={openMarkerInfo}
      onDragEnd={(e) => updateMarkerLocation(e.nativeEvent)}
    >
      <View
        style={[
          styles.marker,
          selectedId === marker.id && styles.selected,
          type === "temp" && styles.temp,
        ]}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: "cyan",
    borderWidth: 5,
    height: 20,
    width: 20,
  },
  temp: {
    borderColor: "lime",
  },
  selected: {
    borderColor: "orange",
    borderWidth: 3,
  },
});
