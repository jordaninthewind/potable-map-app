import { useContext } from "react";
import { Modal, Text } from "react-native-paper";
import { AppStateContext } from "../contexts";

const ModalInterface = ({
  onDismiss,
  visible,
  component = <Text>Modal</Text>,
}) => {
  const state = useContext(AppStateContext);

  console.log(state.value);

  return (
    <Modal
      dismissable={true}
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
    >
      {component}
    </Modal>
  );
};

export default ModalInterface;
