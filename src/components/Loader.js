import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loader = ({ loading }) => {
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
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
