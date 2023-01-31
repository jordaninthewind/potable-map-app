import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { clearModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log("submit");
    dispatch(setUser(username));
    dispatch(clearModal());
  };

  const cancelLogin = () => {
    console.log("cancel");
    dispatch(clearModal());
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={(e) => setUsername(e)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onSubmit}>
          Log In
        </Button>
        <Button mode="outlined" onPress={cancelLogin}>
          Cancel
        </Button>
      </View>
      <View style={styles.helpContainer}>
        <Text>Register</Text>
        <Text>Forgot Password</Text>
        <Text>Forgot Username</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 25,
  },
  inputContainer: {
    // marginVertical: 10,
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontSize: 5,
  },
});

export default Login;
