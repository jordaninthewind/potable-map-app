import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedMarker } from "../features/markers/markersSlice";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { deleteMarkerRemote } from "../services/services";
import { BUTTON_CONTAINER } from "../styles/buttonStyles";

const MarkerInfo = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);

  const deletePin = async () => {
    await deleteMarkerRemote(marker);
    await dispatch(clearModal());
  };

  const addPicture = () => {
    dispatch(setModal("addPicture"));
    console.log("add picture");
  };

  return (
    <View styles={styles.container}>
      {marker && (
        <>
          <Text>Latitude: {marker.location?.latitude} </Text>
          <Text>Longitude: {marker.location?.longitude} </Text>
          <Text>Type: {marker.name}</Text>
          <Text>Reference:</Text>
          <Image source={marker.picture} />
          <Text>Water Quality</Text>
          <Text>Taste</Text>
          <Text>Notes</Text>
          <View style={{ ...BUTTON_CONTAINER }}>
            <Button mode={"contained-tonal"} onPress={addPicture}>
              Add Picture
            </Button>
            <Button mode={"outlined"} onPress={deletePin}>
              Delete
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default MarkerInfo;
