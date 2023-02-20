import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "react-native-paper";

import { setError } from "../features/error/errorSlice";
import { setModal } from "../features/modal/modalSlice";
import { selectUser, setUser } from "../features/user/userSlice";
import { setLoading, setLocation } from "../features/markers/markersSlice";
import { getCurrentPosition } from "../services/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

const MenuGroup = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const auth = getAuth();

  const onStateChange = ({ open }) => setOpen(open);

  const openLoginModal = () => {
    dispatch(setModal("login"));
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const updatePosition = async () => {
    dispatch(setLoading(true));

    try {
      const position = await getCurrentPosition();

      dispatch(setLocation(position));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <FAB.Group
      actions={[
        {
          icon: "plus",
          label: "Add Source",
          onPress: () => {},
          style: { backgroundColor: "white" },
          ...baseFabStyle,
        },
        {
          icon: "crosshairs-gps",
          label: "Get Current Location",
          onPress: updatePosition,
          style: { backgroundColor: "white" },
          ...baseFabStyle,
        },
        {
          icon: user ? "logout" : "login",
          label: user ? "Logout" : "Login",
          onPress: user ? handleLogout : openLoginModal,
          style: { backgroundColor: "white" },
          ...baseFabStyle,
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        console.log("menu opened");
      }}
      icon={"menu"}
      fabStyle={styles.fabStyle}
      open={open}
      visible={true}
      onLongPress={() => {
        console.log("long press");
      }}
      backdropColor="rgba(0,0,0,0)"
    />
  );
};

const baseFabStyle = {
  size: 40,
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
  containerStyle: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 10,
  },
};

const styles = StyleSheet.create({
  fabStyle: {
    backgroundColor: "#fff",
    color: "#000",
  },
});

export default MenuGroup;
