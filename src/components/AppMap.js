import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

export const AppMap = ({ location, onMove, ...props }) => {
  return (
    <MapView
      style={styles.map}
      region={location}
      onRegionChangeComplete={onMove}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
