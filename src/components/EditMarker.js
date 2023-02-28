import { IconButton, Text } from "react-native-paper";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useDispatch } from "react-redux";
import { setModal } from "../features/modal/modalSlice";

const EditMarker = () => {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(setModal("markerInfo"));
  };

  return (
    <BottomSheetScrollView>
      <IconButton icon="arrow-left" onPress={goBack} />
      <Text>EditMarker</Text>
    </BottomSheetScrollView>
  );
};

export default EditMarker;
