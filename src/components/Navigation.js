import { useState } from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";

const Navigation = () => {
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
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Navigation;
