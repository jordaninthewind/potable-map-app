import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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
    <BottomSheetScrollView>
      <View style={styles.nameContainer}>
        <Text variant="titleLarge">{name}</Text>
      </View>
      <View style={styles.locationDetailsContainer}>
        {image && <Image source={image} />}
        <Text>Water Quality: {rating}</Text>
        <Text>Longitude: {shortenString(longitude.toString(), 8)}</Text>
        <Text>Latitude: {shortenString(latitude.toString(), 8)}</Text>
        <Text>Reference: N/A</Text>
        <Text>Taste: GOOD</Text>
        <Text>Distance: Pretty Close</Text>
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
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  nameContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,0,0,0.1)",
    borderRadius: 30,
    justifyContent: "center",
    paddingVertical: 10,
  },
  locationDetailsContainer: {
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
  },
  locationText: {
    color: "rgba(0,0,0,0.75)",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MarkerInfo;
