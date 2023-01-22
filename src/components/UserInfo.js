import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStateContext } from "../contexts";

const UserInfo = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useContext(AppStateContext);

  return (
    <View style={[styles.UserInfoContainer, { top }]}>
      {user ? (
        <Text style={styles.UserInfoText}>Logged in as: {user}</Text>
      ) : (
        <Text>Not Logged In</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  UserInfoContainer: {
    position: "absolute",
    padding: 5,
    zIndex: 1,
    backgroundColor: "white",
  },
  UserInfoText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.65,
    textAlign: "center",
  },
});

export default UserInfo;
