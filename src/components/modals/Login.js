import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoading } from '@state/markersSlice';
import { clearModal, setModal } from '@state/modalSlice';
import { signIn } from '@services/services';
import { ITEM_ROW_CONTAINER } from '@styles/styles';
import HeadlineText from '../common/HeadlineText';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';

const Login = () => {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    const onLogin = () => dispatch(signIn({ email, password }));

    const openRegisterModal = () => dispatch(setModal('register'));

    const cancelLogin = () => dispatch(clearModal());

    return (
        <View>
            <HeadlineText>💧 Potable</HeadlineText>
            <View style={styles.inputContainer}>
                <KeyboardAvoidingTextInput
                    ref={emailInput}
                    value={email}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onSubmitEditing={() => passwordInput.current.focus()}
                    onChangeText={(val) => setEmail(val)}
                    style={styles.input}
                />
                <KeyboardAvoidingTextInput
                    ref={passwordInput}
                    value={password}
                    mode="outlined"
                    placeholder="Password"
                    secureTextEntry={passwordVisible}
                    keyboardType="visible-password"
                    onChangeText={(val) => setPassword(val)}
                    style={styles.input}
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
    input: {
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    itemRowContainer: {
        ...ITEM_ROW_CONTAINER,
    },
    helpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        fontSize: 5,
    },
});

export default Login;
