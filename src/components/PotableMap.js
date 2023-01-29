import { useRef } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import MarkerCallout from "./MarkerCallout";

const PotableMap = ({ location, markers, onMove, addPin, ...props }) => {
  const colorScheme = useColorScheme();
  const mapRef = useRef(null);

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
      {...props}
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
