import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";

import { setSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";

export const PotableMarker = ({ marker, selectedId = null, type = null }) => {
  const { latitude, longitude } = marker;
  const dispatch = useDispatch();

  const openMarkerInfo = () => {
    if (type) return;

    dispatch(setSelectedMarker(marker));
    dispatch(setModal("markerInfo", marker));
  };

  return (
    <Marker
      calloutVisible={true}
      coordinate={{ latitude, longitude }}
      draggable
      onPress={openMarkerInfo}
      // onDragEnd={(e) => updateMarkerLocation({ nativeEvent: e, marker })}
    >
      <View
        style={[styles.marker, selectedId === marker.id && styles.selected]}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 2,
    height: 15,
    width: 15,
  },
  selected: {
    borderColor: "orange",
  },
});
