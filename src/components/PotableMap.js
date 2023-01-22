import { useColorScheme, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const PotableMap = ({ location, markers, onMove, addPin, ...props }) => {
  const colorScheme = useColorScheme();
  return (
    <MapView
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
          <Marker key={`pin${index}`} coordinate={location} title={title} />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
});

export default PotableMap;
