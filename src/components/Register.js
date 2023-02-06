import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setError } from "../features/error/errorSlice";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const dispatch = useDispatch();

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(setUser(userCredential.user));
    } catch (error) {
      const errorMessage = error.message;
      dispatch(setError(errorMessage));
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
