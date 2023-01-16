import { StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";

export const MainButton = ({ updateLocation, loading, style, ...props }) => {
  return (
    <AnimatedFAB
      animateFrom={"right"}
      color={"#fff"}
      extended
      icon={loading ? "loading" : "map-marker"}
      label={loading ? "Loading..." : "Set Current Location"}
      onPress={updateLocation}
      style={styles.fabStyle}
      visible={true}
    />
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    marginLeft: 16,
    marginBottom: 80,
    left: 0,
    bottom: 0,
    opacity: 0.75,
    backgroundColor: "#555",
  },
});
