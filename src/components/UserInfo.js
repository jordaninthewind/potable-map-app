import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/user/userSlice";
import { getAuth } from "firebase/auth";
import { setError } from "../features/error/errorSlice";

const UserInfo = () => {
  const { top } = useSafeAreaInsets();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
        dispatch(setError("User logged out"));
      }
    });
  }, []);

  return (
    <View style={[styles.UserInfoContainer, { top }]}>
      {user ? (
        <Text>Logged in as: {user?.email}</Text>
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
