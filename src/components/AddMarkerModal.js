import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { GeoPoint } from "firebase/firestore";

import {
  resetSelectedMarker,
  selectLoading,
  selectSelectedMarker,
} from "../features/markers/markersSlice";
import { clearModal } from "../features/modal/modalSlice";
import { addMarkerRemote } from "../services/services";
import { BASE_BUTTON, ITEM_ROW_CONTAINER } from "../styles/buttonStyles";

const AddMarkerModal = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);
  const loading = useSelector(selectLoading);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onCancel = () => {
    dispatch(clearModal());
    dispatch(resetSelectedMarker());
  };

  const structureMarker = () => {
    return {
      name,
      type: "water fountain",
      description,
      notes,
      rating,
      imageUrl,
      location: new GeoPoint(marker.latitude, marker.longitude),
    };
  };

  const onSubmit = () => {
    dispatch(addMarkerRemote(structureMarker()));

    dispatch(clearModal());
  };

  return (
    <View>
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        Add Marker
      </Text>
      {!loading && (
        <>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Location Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Description"
            value={description}
            onChangeText={(event) => setDescription(event)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            multiline
            label="Notes"
            value={notes}
            onChangeText={(event) => setNotes(event)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Rating"
            value={rating}
            onChangeText={(event) => setRating(event)}
          />
        </>
      )}
      <View style={{ ...ITEM_ROW_CONTAINER }}>
        <Button mode="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button mode="contained" buttonColor="#ff0000" onPress={onSubmit}>
          {loading ? <ActivityIndicator /> : "Add Marker"}
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
