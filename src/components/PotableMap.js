import { useRef } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Text } from "react-native-paper";

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
      {markers?.map(({ location, title }, index) => {
        return (
          <Marker
            key={`pin${index}`}
            coordinate={location}
            calloutVisible={true}
          >
            <Callout flat style={styles.callout}>
              <Text>Title: {title}</Text>
              <Text>Latitude: {location.latitude} </Text>
              <Text>Longitude: {location.longitude} </Text>
            </Callout>
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
