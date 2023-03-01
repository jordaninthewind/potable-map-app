import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { BottomNavigation as PaperBottomNavigation } from "react-native-paper";

import Settings from "./Settings";
import PotableMap from "./PotableMap";
import MenuGroup from "./MenuGroup";
import ModalInterface from "./ModalInterface";

import { selectTheme } from "../features/app/appSlice";

const MapScreen = () => (
  <View style={{ flex: 1 }}>
    <PotableMap />
    <MenuGroup />
    <ModalInterface />
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1 }}>
    <Settings />
  </View>
);

const BottomNavigation = () => {
  const colorScheme = useSelector(selectTheme);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "map",
      title: "Map",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = PaperBottomNavigation.SceneMap({
    map: MapScreen,
    settings: SettingsScreen,
  });

  return (
    <View style={styles.container}>
      <PaperBottomNavigation
        style={styles.navContainer}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles[colorScheme].background}
        inactiveColor={
          colorScheme === "dark" ? "rgb(200,200,200)" : "rgb(100,100,100)"
        }
        activeColor={
          colorScheme === "dark" ? "rgb(100,100,100)" : "rgb(75,75,75)"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%" },
  navContainer: {
    borderTopColor: "grey",
    borderTopWidth: 1,
  },
  light: {
    background: {
      backgroundColor: "white",
    },
    icon: {
      color: "black",
    },
  },
  dark: {
    background: {
      backgroundColor: "black",
    },
    icon: {
      color: "white",
    },
  },
});

export default BottomNavigation;
