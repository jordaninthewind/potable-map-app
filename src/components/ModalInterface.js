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
import EditMarker from "./EditMarker";
import { resetMapState } from "../services/services";
import { selectTheme } from "../features/app/appSlice";

const ModalInterface = () => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  const modal = useSelector(selectModal);
  const colorScheme = useSelector(selectTheme);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    setComponent(getComponent());
  }, [modal]);

  const handleSheetChange = async (index) => {
    if (index === 0) {
      await bottomSheetRef.current?.close();

      dispatch(resetMapState());
      dispatch(clearModal());
    }
  };

  const getComponent = () => {
    switch (modal) {
      case "login":
        return {
          component: <Login />,
          index: 1,
          snapPoints: ["5%", "80%"],
        };
      case "register":
        return {
          component: <Register />,
          index: 1,
          snapPoints: ["5%", "85%"],
        };
      case "markerInfo":
        return {
          component: <MarkerInfo />,
          index: 1,
          snapPoints: ["10%", "65%"],
        };
      case "addMarker":
        return {
          component: <AddMarkerModal />,
          index: 1,
          snapPoints: ["5%", "70%"],
        };
      case "addPicture":
        return {
          component: <AddPicture />,
          index: 1,
          snapPoints: ["5%", "85%"],
        };
      case "editMarker":
        return {
          component: <EditMarker />,
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
          animateOnMount
          ref={bottomSheetRef}
          style={styles.container}
          backgroundStyle={styles[colorScheme]}
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
  light: {
    backgroundColor: "white",
  },
  dark: {
    backgroundColor: "lightgrey",
  },
});

export default ModalInterface;
