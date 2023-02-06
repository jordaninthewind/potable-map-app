import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedMarker,
  selectSelectedMarker,
} from "../features/markers/markersSlice";
import { clearModal } from "../features/modal/modalSlice";
import { BASE_BUTTON } from "../styles/buttonStyles";

const AddMarkerModal = () => {
  const dispatch = useDispatch();
  const currentMarker = useSelector(selectSelectedMarker);

  // const { location } = currentMarker;

  const onCancel = () => {
    dispatch(clearModal());
    dispatch(resetSelectedMarker());
  };

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <View>
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        New Marker Info
      </Text>
      {/* <Text variant="bodyMedium">Longitude: {location.longitude} </Text>
      <Text variant="bodyMedium">Latitude: {location.latitude} </Text> */}
      <TextInput mode="outlined" label="Location Name" />
      <TextInput mode="outlined" label="Description" />
      <TextInput mode="outlined" multiline label="Notes" />
      <TextInput mode="outlined" label="Rating" />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonContainer}
          mode="contained"
          buttonColor="#ff0000"
          onPress={onSubmit}
        >
          Add Marker
        </Button>
        <Button
          style={styles.buttonContainer}
          mode="outlined"
          onPress={onCancel}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  buttonStyle: {
    ...BASE_BUTTON,
  },
});

export default AddMarkerModal;
