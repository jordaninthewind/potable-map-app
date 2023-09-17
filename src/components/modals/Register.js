import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoading } from '@state/markersSlice';
import { clearModal, setModal } from '@state/modalSlice';
import { signUp } from '@services/services';
import { ITEM_ROW_CONTAINER } from '@styles/styles';
import KeyboardAvoidingTextInput from '../common/KeyboardAvoidingTextInput';
import HeadlineText from '../common/HeadlineText';
import { SPACING_SMALL } from '@styles/styles';

const Register = () => {
    const dispatch = useDispatch();

    const emailInput = useRef(null);

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const loading = useSelector(selectLoading);

    const onRegister = async () => dispatch(signUp({ email, password }));

    const cancelSignUp = () => dispatch(clearModal());

    const returnToLogin = () => dispatch(setModal('login'));

    return (
        <View>
            <HeadlineText>💧 Register an account</HeadlineText>
            <View>
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    ref={emailInput}
                    placeholder="E-mail Address"
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    error={email.length === 0}
                />
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    mode="outlined"
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={passwordVisible}
                />
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    placeholder="Verify Password"
                    onChangeText={(e) => setVerifyPassword(e)}
                    value={verifyPassword}
                    type="password"
                    secureTextEntry={passwordVisible}
                />
            </View>

            <Checkbox
                status={agreed ? 'checked' : 'unchecked'}
                onPress={() => {
                    setAgreed(!agreed);
                }}
            />
            <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={cancelSignUp}>
                    Cancel
                </Button>
                <Button mode="contained" onPress={onRegister} loading={loading}>
                    Register
                </Button>
            </View>
            <Button
                style={styles.buttonContainer}
                mode="text"
                onPress={returnToLogin}
            >
                Go back to login
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginVertical: SPACING_SMALL,
    },
    inputContainer: {
        justifyContent: 'center',
        height: 125,
        paddingHorizontal: 20,
    },
    itemRowContainer: ITEM_ROW_CONTAINER,
});

export default Register;
