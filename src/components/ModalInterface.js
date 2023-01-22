import { Modal, Text } from "react-native-paper";

const ModalInterface = ({ onDismiss, visible }) => {
  return (
    <Modal
      dismissable={true}
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
    >
      <Text>Modal</Text>
    </Modal>
  );
};

export default ModalInterface;
