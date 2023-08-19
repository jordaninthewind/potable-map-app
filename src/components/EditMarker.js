import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { COLOR_WARNING } from "@app/constants";
import { selectSelectedMarker } from "@features/markersSlice";
import { setModal } from "@features/modalSlice";
import { deleteMarkerRemote } from "@services/services";
import { ITEM_ROW_CONTAINER } from "@styles/styles";

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
        onChange={(e) => setName(e)}
        value={name}
      />
      <TextInput
        mode="outlined"
        label="Type"
        onChange={(e) => setType(e)}
        value={type}
      />
      <TextInput
        multiline
        mode="outlined"
        label="Description"
        onChange={(e) => setDescription(e)}
        value={description}
      />
      <TextInput
        mode="outlined"
        label="Rating"
        onChange={(e) => setRating(e)}
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
