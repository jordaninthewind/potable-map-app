import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  BottomNavigation as PaperBottomNavigation,
  Text,
} from "react-native-paper";
import { selectTheme } from "../features/app/appSlice";

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
      key: "list",
      title: "Nearby",
      focusedIcon: "view-list",
      unfocusedIcon: "view-list-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = PaperBottomNavigation.SceneMap({
    map: () => <Text>Scene 1</Text>,
    list: () => <Text>Scene 2</Text>,
    settings: () => <Text>Scene 3</Text>,
  });

  return (
    <PaperBottomNavigation
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

export default BottomNavigation;
