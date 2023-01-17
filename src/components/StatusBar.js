import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function StatusBar() {
  const { top } = useSafeAreaInsets();
  const userName = "John Doe";

  return (
    <View style={[styles.statusBarContainer, { top }]}>
      <Text style={styles.statusBarText}>Logged in as: </Text>
      <Text style={styles.statusBarText}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    paddingRight: 15,
    position: "absolute",
    zIndex: 1,
    width: "100%",
  },
  statusBarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.65,
    textAlign: "right",
  },
});

export default StatusBar;
