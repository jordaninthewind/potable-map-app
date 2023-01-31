import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "react-native-paper";

import { setModal } from "../features/modal/modalSlice";
import { selectUser, setUser } from "../features/user/userSlice";

const MenuGroup = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);

  const onStateChange = ({ open }) => setOpen(open);

  const openLoginModal = () => {
    dispatch(setModal("login"));
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch(setUser(null));
  };

  return (
    <FAB.Group
      actions={[
        {
          icon: "plus",
          label: "Add Source",
          onPress: () => {},
          ...baseFabStyle,
        },
        {
          icon: "crosshairs-gps",
          label: "Get Current Location",
          onPress: () => {},
          ...baseFabStyle,
        },
        {
          icon: user ? "logout" : "login",
          label: user ? "Logout" : "Login",
          onPress: user ? handleLogout : openLoginModal,
          ...baseFabStyle,
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        console.log("menu opened");
      }}
      icon={"menu"}
      fabStyle={styles.fabStyle}
      mode="flat"
      open={open}
      style={styles.fabBackgroundStyle}
      visible={true}
      onLongPress={() => {
        console.log("long press");
      }}
      backdropColor="rgba(0,0,0,0)"
    />
  );
};

const baseFabStyle = {
  backgroundColor: "white",
  size: "medium",
  lightLabelStyle: {
    color: "white",
    fontSize: 20,
    textShadowColor: "#000000",
    textShadowRadius: 5,
  },
  darkLabelStyle: {
    color: "white",
    fontSize: 20,
    textShadowColor: "#000000",
    textShadowRadius: 5,
  },
};

const styles = StyleSheet.create({
  fabStyle: {
    backgroundColor: "#fff",
    color: "#000",
  },
});

export default MenuGroup;
