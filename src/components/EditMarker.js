import { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { setModal } from "../features/modal/modalSlice";
import { selectSelectedMarker } from "../features/markers/markersSlice";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";
import { COLOR_WARNING } from "../constants";

const EditMarker = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);

  const [name, setName] = useState(marker?.name);
  const [type, setType] = useState(marker?.type);
  const [rating, setRating] = useState(marker?.rating);
  const [description, setDescription] = useState(marker?.description);

  const goBack = () => {
    dispatch(setModal("markerInfo"));
  };

  const AddPicture = () => {
    dispatch(setModal("addPicture"));
  };

  const deleteMarker = () => {};

  const updateMarker = () => {};

  return (
    <BottomSheetScrollView>
      <TextInput
        mode="outlined"
        label="Name"
        onChange={(e) => setName}
        value={name}
      />
      <TextInput
        mode="outlined"
        label="Type"
        onChange={(e) => setType}
        value={type}
      />
      <TextInput
        multiline
        mode="outlined"
        label="Description"
        onChange={(e) => setDescription}
        value={description}
      />
      <TextInput
        mode="outlined"
        label="Rating"
        onChange={(e) => setRating}
        value={rating}
      />
      <View style={[{ marginTop: 10 }]}>
        <Button mode="contained" onPress={AddPicture}>
          Add a Picture
        </Button>
      </View>
      <View style={[{ marginTop: 10 }]}>
        <Button
          mode="contained"
          buttonColor={COLOR_WARNING}
          onPress={AddPicture}
        >
          Delete Marker
        </Button>
      </View>
      <View style={[ITEM_ROW_CONTAINER, { marginTop: 10 }]}>
        <Button mode="outlined" onPress={goBack}>
          Cancel
        </Button>
        <Button mode="contained" onPress={updateMarker}>
          Update
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};

export default EditMarker;
