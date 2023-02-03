import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";
import { signUp } from "../services/authService";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onRegister = async () => {
    console.log("submit");

    try {
      const user = await signUp({ email, password });
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelSignUp = () => {
    dispatch(clearModal());
  };

  const returnToLogin = () => {
    dispatch(setModal("login"));
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="E-mail Address"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          mode="outlined"
          type="password"
          label="Password"
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={onRegister}>
          Register
        </Button>
        <Button mode="outlined" onPress={cancelSignUp}>
          Cancel
        </Button>
      </View>
      <View style={styles.helpContainer}>
        <Button mode="text" onPress={returnToLogin}>
          Go back to login
        </Button>
        <Text>Forgot Password</Text>
        <Text>Forgot Username</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    height: 125,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    height: 125,
    paddingHorizontal: 20,
  },
  helpContainer: {
    justifyContent: "center",
    height: 125,
    paddingHorizontal: 20,
  },
});

export default Register;
