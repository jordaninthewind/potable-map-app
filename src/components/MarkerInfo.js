import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedMarker } from "../features/markers/markersSlice";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { deletePinRemote } from "../services/services";

const MarkerInfo = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);

  const deletePin = async () => {
    await deletePinRemote(marker);
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
          <Text>Type: {marker.type}</Text>
          <Text>Reference:</Text>
          <Image source={marker.picture} />
          <Text>Water Quality</Text>
          <Text>Taste</Text>
          <Text>Notes</Text>
          <Button onPress={addPicture}>Add Picture</Button>
          <Button onPress={deletePin}>Delete</Button>
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
