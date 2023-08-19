import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FAB } from "react-native-paper";

import {
  selectTheme,
  selectDeviceLocationPermissions,
} from "@features/appSlice";
import { selectLocation, setTempMarker } from "@features/markersSlice";
import { setModal } from "@features/modalSlice";
import { selectUser, selectUserEmail } from "@features/userSlice";
import { getCurrentPosition } from "@services/services";

const MenuGroup = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectUserEmail);
  const colorScheme = useSelector(selectTheme);
  const deviceHasPermissions = useSelector(selectDeviceLocationPermissions);
  const location = useSelector(selectLocation);

  const updatePosition = async () => await dispatch(getCurrentPosition());

  const addTempMarker = async () => {
    dispatch(setTempMarker(location));
    dispatch(setModal("addMarker"));
  };

  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        disabled={!isLoggedIn}
        onPress={addTempMarker}
        style={styles[colorScheme].fabStyle}
      />
      <FAB
        icon={"crosshairs-gps"}
        onPress={updatePosition}
        disabled={!!deviceHasPermissions}
        style={styles[colorScheme].fabStyle}
      />
    </View>
  );
};

const fabStyle = {
  margin: 10,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 10,
    marginBottom: 20,
  },
  light: {
    fabStyle: {
      ...fabStyle,
      backgroundColor: "#fff",
      color: "#000",
    },
  },
  dark: {
    fabStyle: {
      ...fabStyle,
      backgroundColor: "lightgrey",
      color: "#fff",
    },
  },
});

export default MenuGroup;
