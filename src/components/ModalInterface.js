import { StyleSheet } from "react-native";
import { Modal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { clearModal, selectModal } from "../features/modal/modalSlice";
import AddMarkerModal from "./AddMarkerModal";
import AddPicture from "./AddPicture";
import Login from "./Login";
import MarkerInfo from "./MarkerInfo";
import Register from "./Register";

const ModalInterface = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const onDismiss = () => dispatch(clearModal());

  const getComponent = () => {
    switch (modal) {
      case "login":
        return <Login />;
      case "register":
        return <Register />;
      case "markerInfo":
        return <MarkerInfo />;
      case "addMarker":
        return <AddMarkerModal />;
      case "addPicture":
        return <AddPicture />;
      default:
        return null;
    }
  };

  return (
    <Modal
      dismissable={true}
      visible={modal !== null}
      onDismiss={onDismiss}
      contentContainerStyle={styles.container}
    >
      {getComponent()}
    </Modal>
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

export default ModalInterface;
