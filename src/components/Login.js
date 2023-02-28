import { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { clearModal, setModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";
import { setError } from "../features/error/errorSlice";

import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";
import { selectLoading, setLoading } from "../features/markers/markersSlice";
import Logo from "./Logo";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const loading = useSelector(selectLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onLogin = async () => {
    dispatch(setLoading(true));

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      dispatch(setUser({ id: user.uid, email: user.email }));

      dispatch(setError({ message: "Logged in successfully!" }));
      dispatch(clearModal());
    } catch ({ message }) {
      dispatch(setError({ message }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelLogin = () => {
    dispatch(clearModal());
  };

  const openRegisterModal = () => {
    dispatch(setModal("register"));
  };

  return (
    <View>
      <Logo />
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          mode="outlined"
          label="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
          onChangeText={(val) => setEmail(val)}
          right={
            <TextInput.Icon
              icon={!email ? "pencil" : "close"}
              onPress={() => setEmail("")}
            />
          }
        />
        <TextInput
          value={password}
          mode="outlined"
          label="Password"
          secureTextEntry={passwordVisible}
          onChangeText={(val) => setPassword(val)}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>
      <View style={styles.itemRowContainer}>
        <Button mode="outlined" onPress={cancelLogin}>
          Cancel
        </Button>
        <Button loading={loading} mode="contained" onPress={onLogin}>
          Log In
        </Button>
      </View>
      <View style={styles.itemRowContainer}>
        <Button type="text">Forgot Password</Button>
        <Button type="text">Forgot Username</Button>
      </View>
      <Button mode="text" onPress={openRegisterModal}>
        New User? Register...
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  itemRowContainer: {
    ...ITEM_ROW_CONTAINER,
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontSize: 5,
  },
});

export default Login;
