import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { setModal } from "../features/modal/modalSlice";
import { selectSelectedMarker } from "../features/markers/markersSlice";
import { ITEM_ROW_CONTAINER } from "../styles/styles";
import { COLOR_WARNING } from "../constants";
import { deleteMarkerRemote } from "../services/services";

const EditMarker = () => {
  const dispatch = useDispatch();
  const marker = useSelector(selectSelectedMarker);

  const [name, setName] = useState(marker?.name);
  const [type, setType] = useState(marker?.type);
  const [rating, setRating] = useState(marker?.rating);
  const [description, setDescription] = useState(marker?.description);

  const updateMarker = () => {
    const updatedMarker = {
      ...marker,
      name,
      type,
      rating,
      description,
    };

    dispatch(updateMarkerRemote(updatedMarker));
  };

  useEffect(() => {
    () => dispatch(updateMarker());
  }, [name, type, rating, description]);

  const goBack = () => {
    dispatch(setModal("markerInfo"));
  };

  const openCameraView = () => {
    dispatch(setModal("addPicture"));
  };

  const deleteMarker = () => dispatch(deleteMarkerRemote(marker));

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
      <View style={[ITEM_ROW_CONTAINER, { marginTop: 10 }]}>
        <Button mode="outlined" onPress={openCameraView}>
          Add a Picture
        </Button>
        <Button
          mode="contained"
          buttonColor={COLOR_WARNING}
          onPress={deleteMarker}
        >
          Delete Marker
        </Button>
      </View>
      <View style={[ITEM_ROW_CONTAINER, { marginTop: 10 }]}>
        <Button mode="text" onPress={goBack}>
          Cancel
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};

export default EditMarker;
