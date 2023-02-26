import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../features/error/errorSlice";
import { clearModal, setModal } from "../features/modal/modalSlice";
import { setUser } from "../features/user/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ITEM_ROW_CONTAINER } from "../styles/buttonStyles";
import { selectLoading, setLoading } from "../features/markers/markersSlice";
import Logo from "./Logo";
import { validateEmail } from "../features/error/errorHelpers";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const auth = getAuth();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [agreed, setAgreed] = useState(false);

  const onRegister = async () => {
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(setUser(userCredential.user));
    } catch ({ message }) {
      dispatch(setError({ message }));
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
      <Logo />
      <View>
        <TextInput
          label="E-mail Address"
          mode="outlined"
          onChangeText={(e) => setEmail(e)}
          value={email}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          onBlur={() => setEmailValid(validateEmail(email && email.trim()))}
          error={email.length === 0}
          right={
            <TextInput.Icon
              icon={email && "close"}
              onPress={() => setEmail("")}
            />
          }
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          clearTextOnFocus
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
          label="Verify Password"
          type="password"
          value={verifyPassword}
          clearTextOnFocus
          onChangeText={(e) => setVerifyPassword(e)}
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
          label="First Name"
          value={firstName}
          onChangeText={(e) => setFirstName(e)}
          right={
            <TextInput.Icon
              icon={firstName && "close"}
              onPress={() => setFirstName("")}
            />
          }
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          value={lastName}
          onChangeText={(e) => setLastName(e)}
          right={
            <TextInput.Icon
              icon={lastName && "close"}
              onPress={() => setLastName("")}
            />
          }
        />
        <TextInput
          mode="outlined"
          label="State / Province"
          value={state}
          onChangeText={(e) => setState(e)}
          right={
            <TextInput.Icon
              icon={state && "close"}
              onPress={() => setState("")}
            />
          }
        />
        <TextInput
          mode="outlined"
          label="Country"
          value={country}
          onChangeText={(e) => setCountry(e)}
          right={
            <TextInput.Icon
              icon={country && "close"}
              onPress={() => setCountry("")}
            />
          }
        />
      </View>

      <Checkbox
        status={agreed ? "checked" : "unchecked"}
        onPress={() => {
          setAgreed(!agreed);
        }}
      />
      <View style={styles.itemRowContainer}>
        <Button mode="outlined" onPress={cancelSignUp}>
          Cancel
        </Button>
        <Button mode="contained" onPress={onRegister}>
          Register
        </Button>
      </View>
      <Button mode="text" onPress={returnToLogin}>
        Go back to login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    height: 125,
    paddingHorizontal: 20,
  },
  itemRowContainer: ITEM_ROW_CONTAINER,
});

export default Register;
