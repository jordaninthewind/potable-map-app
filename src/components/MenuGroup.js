import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const MenuGroup = ({ updateLocation, loading, style, ...props }) => {
  const [open, setOpen] = useState(false);

  const onStateChange = ({ open }) => setOpen(open);

  return (
    <FAB.Group
      actions={[
        {
          icon: "plus",
          label: "Add Source",
          onPress: updateLocation,
        },
        {
          icon: "crosshairs-gps",
          label: "Get Current Location",
          onPress: updateLocation,
        },
        {
          icon: "login",
          label: "Login",
          onPress: updateLocation,
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        console.log("menu opened");
      }}
      icon={loading ? "loading" : "menu"}
      fabStyle={styles.fabStyle}
      mode="flat"
      open={open}
      style={styles.fabBackgroundStyle}
      visible={true}
      onLongPress={() => {
        console.log("long press");
      }}
      size={"small"}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    backgroundColor: "#fff",
    color: "#000",
  },
});

export default MenuGroup;
