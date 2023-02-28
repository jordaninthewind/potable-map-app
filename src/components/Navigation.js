import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { BottomNavigation, Text } from "react-native-paper";
import { selectTheme } from "../features/app/appSlice";

const Navigation = () => {
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
      key: "about",
      title: "About",
      focusedIcon: "library",
      unfocusedIcon: "library",
    },
    {
      key: "recents",
      title: "Recents",
      focusedIcon: "history",
      unfocusedIcon: "history",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  // const renderScene = BottomNavigation.SceneMap({
  //   music: "() => {}",
  //   albums: "() => {}",
  //   recents: "() => {}",
  //   notifications: "() => {}",
  // });

  return (
    <BottomNavigation
      style={styles.container}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={() => <Text>Scene 1</Text>}
      barStyle={styles[colorScheme].background}
      inactiveColor={
        colorScheme === "dark" ? "rgb(200,200,200)" : "rgb(100,100,100)"
      }
      activeColor={
        colorScheme === "dark" ? "rgb(100,100,100)" : "rgb(75,75,75)"
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: "grey",
    borderTopWidth: 1,
    flex: 1,
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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

export default Navigation;
