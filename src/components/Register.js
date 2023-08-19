import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearModal, setModal } from "@features/modalSlice";
import { ITEM_ROW_CONTAINER } from "@styles/styles";
import { selectLoading, setLoading } from "@features/markersSlice";
import Logo from "@components/Logo";
import { validateEmail } from "@features/errorHelpers";
import { signUp } from "@services/services";

const Register = () => {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const loading = useSelector(selectLoading);

  const onRegister = async () => dispatch(signUp({ email, password }));

  const cancelSignUp = () => dispatch(clearModal());

  const returnToLogin = () => dispatch(setModal("login"));

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
          onChangeText={(e) => setVerifyPassword(e)}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPasswordVisible(!passwordVisible)}
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
        <Button mode="contained" onPress={onRegister} loading={loading}>
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
