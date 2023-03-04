import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { setModal } from "../features/modal/modalSlice";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      {!user && (
        <View style={[styles.UserInfoContainer, ITEM_ROW_CONTAINER]}>
          <Text>Not Logged In</Text>
          <Button
            compact
            variant="text"
            onPress={() => dispatch(setModal("login"))}
          >
            Log In
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  UserInfoContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    bottom: 0,
    paddingHorizontal: 15,
    position: "absolute",
    right: 0,
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
