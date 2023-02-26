import { StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";

import { clearModal, selectModal } from "../features/modal/modalSlice";
import AddMarkerModal from "./AddMarkerModal";
import AddPicture from "./AddPicture";
import Login from "./Login";
import MarkerInfo from "./MarkerInfo";
import Register from "./Register";
import { useEffect, useRef, useState } from "react";

const ModalInterface = () => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const modal = useSelector(selectModal);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const component = getComponent();
    setComponent(component);
  }, [modal]);

  const handleSheetChange = (index) => {
    console.log("handleSheetChange", index);
    if (index === 0) {
      dispatch(clearModal());
    }
  };

  const getComponent = () => {
    switch (modal) {
      case "login":
        return {
          component: <Login />,
          index: 1,
          snapPoints: ["5%", "45%", "75%"],
        };
      case "register":
        return {
          component: <Register />,
          index: 1,
          snapPoints: ["5%", "75%"],
        };
      case "markerInfo":
        return {
          component: <MarkerInfo />,
          index: 1,
          snapPoints: ["10%", "40%"],
        };
      case "addMarker":
        return {
          component: <AddMarkerModal />,
          index: 1,
          snapPoints: ["5%", "40%", "70%"],
        };
      case "addPicture":
        return {
          component: <AddPicture />,
          index: 1,
          snapPoints: ["5%", "70%"],
        };
      default:
        return { component: null, snapPoints: ["10%"] };
    }
  };

  return (
    <>
      {component?.component && (
        <BottomSheet
          ref={bottomSheetRef}
          style={styles.container}
          // animateOnMount={true}
          // keyboardBehavior="extend"
          keyboardBlurBehavior="restore"
          // android_keyboardInputMode="adjustPan"
          snapPoints={component.snapPoints}
          // handleHeight={20}
          // enablePanDownToClose
          index={component.index}
          onChange={handleSheetChange}
        >
          {component.component}
        </BottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default ModalInterface;
