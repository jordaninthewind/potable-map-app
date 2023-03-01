import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "react-native-paper";

import { setError } from "../features/error/errorSlice";
import { setModal } from "../features/modal/modalSlice";
import { selectUser } from "../features/user/userSlice";
import { setLoading, setLocation } from "../features/markers/markersSlice";
import { getCurrentPosition } from "../services/services";
import { getAuth } from "firebase/auth";
import { selectTheme, setTheme } from "../features/app/appSlice";

const MenuGroup = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const colorScheme = useSelector(selectTheme);

  const auth = getAuth();

  const onStateChange = ({ open }) => setOpen(open);

  const openLoginModal = () => {
    dispatch(setModal("login"));
  };

  const updatePosition = async () => {
    dispatch(setLoading(true));

    try {
      const position = await getCurrentPosition();

      dispatch(setLocation(position));
    } catch ({ message }) {
      dispatch(setError({ message }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const baseMenuItems = [
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
  ];

  return (
    <FAB.Group
      actions={
        user
          ? [
              {
                icon: "account-details",
                label: "Account Details",
                onPress: () => {},
                style: { backgroundColor: "white" },
                ...baseFabStyle,
              },
              ...baseMenuItems,
              {
                icon: "logout",
                label: "Logout",
                onPress: handleLogout,
                ...baseFabStyle,
                style: { backgroundColor: "white" },
              },
            ]
          : [
              ...baseMenuItems,
              {
                icon: "login",
                label: "Login",
                onPress: openLoginModal,
                style: { backgroundColor: "white" },
                ...baseFabStyle,
              },
            ]
      }
      onStateChange={onStateChange}
      onPress={() => {
        console.log("menu opened");
      }}
      icon={open ? "close" : "menu"}
      fabStyle={styles.fabStyle}
      open={open}
      visible
      onLongPress={() => {
        console.log("long press");
      }}
      backdropColor="rgba(255,255,255,0.5)"
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
    backgroundColor: "rgba(255,255,255,1)",
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
