import { useColorScheme, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const PotableMap = ({ location, markers, onMove, addPin, ...props }) => {
  const colorScheme = useColorScheme();
  return (
    <MapView
      onLongPress={addPin}
      onRegionChangeComplete={onMove}
      region={location}
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
    width: "100%",
    height: "100%",
  },
});

export default PotableMap;
