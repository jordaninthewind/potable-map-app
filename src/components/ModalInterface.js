import { StyleSheet } from "react-native";
import { Modal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { clearModal, selectModal } from "../features/modal/modalSlice";
import Login from "./Login";
import MarkerInfo from "./MarkerInfo";

const ModalInterface = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const onDismiss = () => {
    dispatch(clearModal());
  };

  const getComponent = () => {
    switch (modal) {
      case "login":
        return <Login />;
      case "register":
        return <Text>Register</Text>;
      case "markerInfo":
        return <MarkerInfo />;
      default:
        return <Text>Modal</Text>;
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
