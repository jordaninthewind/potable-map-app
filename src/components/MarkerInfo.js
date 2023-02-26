import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { selectSelectedMarker } from "../features/markers/markersSlice";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { shortenString } from "../helpers";
import { deleteMarkerRemote } from "../services/services";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";

const MarkerInfo = () => {
  const dispatch = useDispatch();
  const { longitude, latitude, name, image, rating, notes } =
    useSelector(selectSelectedMarker);

  const deletePin = async () => {
    await deleteMarkerRemote(marker);
    await dispatch(clearModal());
  };

  const addPicture = () => {
    dispatch(setModal("addPicture"));
  };

  return (
    <View styles={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          Long: {shortenString(longitude.toString(), 8)}
        </Text>
        <Text style={styles.locationText}>
          Lat: {shortenString(latitude.toString(), 8)}
        </Text>
      </View>
      <View style={styles.locationDetails}>
        <Text>Type: {name}</Text>
        {image && <Image source={image} />}
        <Text>Water Quality: {rating}</Text>
        <Text>Reference: N/A</Text>
        <Text>Taste: GOOD</Text>
        <Text>Notes: {notes}</Text>
      </View>
      <View style={{ ...ITEM_ROW_CONTAINER }}>
        <Button mode={"contained-tonal"} onPress={addPicture}>
          Add Picture
        </Button>
        <Button mode={"outlined"} onPress={deletePin}>
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  locationContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 30,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  locationDetails: {
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  locationText: {
    color: "rgba(0,0,0,0.75)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MarkerInfo;
