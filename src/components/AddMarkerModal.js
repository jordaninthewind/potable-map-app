import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSelectedMarker,
  selectSelectedMarker,
} from "../features/markers/markersSlice";
import { clearModal } from "../features/modal/modalSlice";
import { firebaseAdapter } from "../helpers";
import { addMarkerRemote } from "../services/services";
import { BASE_BUTTON } from "../styles/buttonStyles";

const AddMarkerModal = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onCancel = () => {
    dispatch(clearModal());
    dispatch(resetSelectedMarker());
  };

  const onSubmit = () => {
    console.log("submitting marker", marker);
    addMarkerRemote({
      name,
      description,
      notes,
      imageUrl,
      location: firebaseAdapter({ type: "location-geopoint" }).toFirestore(
        marker
      ),
      rating,
    });
    console.log("marker added");
  };

  return (
    <View>
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        Add Marker
      </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Location Name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        multiline
        label="Notes"
        value={notes}
        onChange={({ target }) => setNotes(target.value)}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Rating"
        value={rating}
        onChange={({ target }) => setRating(target.value)}
      />
      <View style={styles.buttonContainer}>
        <Button mode="contained" buttonColor="#ff0000" onPress={onSubmit}>
          Add Marker
        </Button>
        <Button mode="outlined" onPress={onCancel}>
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
  input: {
    marginTop: 5,
  },
});

export default AddMarkerModal;
