import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Text variant={"headlineLarge"}>potable</Text>
      <Text variant={"headlineSmall"}>find water anywhere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.65,
    textAlign: "center",
  },
});

export default Logo;
