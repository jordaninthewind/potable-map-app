import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import { clearModal, setModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setError } from "../features/error/errorSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("login");

      const user = userCredential.user;
      console.log(user);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error));
    }
    // dispatch(clearModal());
  };

  const cancelLogin = () => {
    console.log("cancel");
    dispatch(clearModal());
  };

  const openRegisterModal = () => {
    console.log("register");
    dispatch(setModal("register"));
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          mode="outlined"
          label="Email Address"
          keyboardType="email-address"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          value={password}
          mode="outlined"
          label="Password"
          secureTextEntry={passwordVisible}
          onChangeText={(e) => setPassword(e)}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onLogin}>
          Log In
        </Button>
        <Button mode="outlined" onPress={cancelLogin}>
          Cancel
        </Button>
      </View>
      <View style={styles.helpContainer}>
        <Button mode="text" onPress={openRegisterModal}>
          Sign Up
        </Button>
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
