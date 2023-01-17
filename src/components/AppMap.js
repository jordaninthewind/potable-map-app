import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const AppMap = ({ location, onMove, ...props }) => {
  return (
    <MapView
      cacheEnabled={true}
      onRegionChangeComplete={onMove}
      region={location}
      scrollEnabled={false}
      showsBuildings={false}
      showsCompass={false}
      showsIndoors={false}
      showsIndoorLevelPicker={false}
      showsMyLocationButton={false}
      showsPointsOfInterest={false}
      showsUserLocation={true}
      showsTraffic={true}
      style={styles.map}
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

export default AppMap;
