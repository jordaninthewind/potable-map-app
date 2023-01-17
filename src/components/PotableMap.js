import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const PotableMap = ({ location, onMove, addPin, ...props }) => (
  <MapView
    cacheEnabled={true}
    onLongPress={addPin}
    onRegionChangeComplete={onMove}
    region={location}
    showsPointsOfInterest={false}
    showsUserLocation={true}
    showsTraffic={true}
    userInterfaceStyle="dark"
    style={styles.map}
    {...props}
  />
);

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default PotableMap;
