import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Logo() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.logoContainer, { bottom }]}>
      <Text style={styles.logoText}>potable</Text>
      <Text>find water anywhere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    left: 0,
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 10,
    position: "absolute",
    zIndex: 1,
  },
  logoText: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.65,
    textAlign: "right",
  },
});

export default Logo;
