import { StyleSheet, View } from "react-native";
import { Callout } from "react-native-maps";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setSelectedMarker } from "../features/markers/markersSlice";
import { setModal } from "../features/modal/modalSlice";

const MarkerCallout = ({ marker }) => {
  const dispatch = useDispatch();
  const openMarkerInfo = () => {
    dispatch(setSelectedMarker(marker));
    dispatch(setModal("markerInfo", marker));
    console.log("delete pin");
  };

  return (
    <Callout onPress={openMarkerInfo}>
      <View style={styles.container}>
        <Text variant="titleMedium">Type: {marker.type}</Text>
        <Text variant="titleMedium">Rating: {marker.rating}</Text>
        <Button style={styles.button} mode="outlined" onPress={openMarkerInfo}>
          Details
        </Button>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: 125,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
  },
});

export default MarkerCallout;
