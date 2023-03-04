import React from "react";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";

import {
  setSelectedMarker,
  setTempMarker,
} from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";

export const PotableMarker = ({ marker, selectedId = null, type = null }) => {
  const dispatch = useDispatch();
  const { latitude, longitude } = marker;

  const openMarkerInfo = () => {
    if (type) return;

    dispatch(setSelectedMarker(marker));
    dispatch(setModal("markerInfo"));
  };

  const updateMarkerLocation = ({ id, coordinate }) => {
    if (id === "unknown") {
      dispatch(setTempMarker(coordinate));
    }
  };

  return (
    <Marker
      identifier={marker.id}
      calloutVisible={true}
      coordinate={{ latitude, longitude }}
      onPress={openMarkerInfo}
      draggable={type === "temp"}
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
    borderWidth: 3,
    height: 15,
    width: 15,
  },
  temp: {
    borderColor: "lime",
    height: 25,
    width: 25,
  },
  selected: {
    borderColor: "orange",
    borderWidth: 2,
    height: 20,
    width: 20,
  },
});
