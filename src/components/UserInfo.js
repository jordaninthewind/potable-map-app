import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function UserInfo() {
  const { top } = useSafeAreaInsets();
  const userName = "John Doe";

  return (
    <View style={[styles.UserInfoContainer, { top }]}>
      <Text style={styles.UserInfoText}>Logged in as: </Text>
      <Text style={styles.UserInfoText}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  UserInfoContainer: {
    paddingRight: 15,
    position: "absolute",
    zIndex: 1,
    width: "100%",
  },
  UserInfoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.65,
    textAlign: "right",
  },
});

export default UserInfo;
