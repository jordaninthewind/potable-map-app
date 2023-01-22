import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Loader = ({ loading }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      {loading && (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size={"large"} color="#f00" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    bottom: 0,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default Loader;
