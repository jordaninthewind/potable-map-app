import { Linking, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    selectDeviceLocationPermissions,
    selectTheme,
    setTheme,
} from '@state/appSlice';
import { selectAuthState } from '@state/userSlice';
import { signOut } from '@services/services';

const Settings = () => {
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets();
    const colorTheme = useSelector(selectTheme);
    const isDarkMode = colorTheme === 'dark';
    const deviceHasPermissions = useSelector(selectDeviceLocationPermissions);
    const isLoggedIn = useSelector(selectAuthState);

    const toggleColorScheme = async () => {
        const themeColor = isDarkMode ? 'light' : 'dark';
        await AsyncStorage.setItem('theme', themeColor);
        await dispatch(setTheme(themeColor));
    };

    const logOut = () => dispatch(signOut());

    const openDeviceSettings = () => Linking.openSettings();

    return (
        <View
            style={[
                styles.container,
                styles[colorTheme].background,
                { paddingTop: top },
            ]}
        >
            <View style={styles.optionContainer}>
                <View style={styles.option}>
                    <Text
                        variant="headlineSmall"
                        style={styles[colorTheme].text}
                    >
                        Enable {isDarkMode ? 'light' : 'dark'} mode
                    </Text>
                    <Switch
                        value={colorTheme === 'dark'}
                        onChange={toggleColorScheme}
                    />
                </View>
                {isLoggedIn && (
                    <View style={styles.option}>
                        <Text
                            variant="headlineSmall"
                            style={styles[colorTheme].text}
                        >
                            Log out current user
                        </Text>
                        <Button
                            disabled={!isLoggedIn}
                            mode={'contained'}
                            onPress={logOut}
                        >
                            Log out
                        </Button>
                    </View>
                )}
                {!deviceHasPermissions && (
                    <View style={styles.option}>
                        <Text
                            variant="headlineSmall"
                            style={styles[colorTheme].text}
                        >
                            Enable location services
                        </Text>
                        <Button onPress={openDeviceSettings}>
                            Enable in Settings
                        </Button>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    optionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    option: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dark: {
        background: {
            backgroundColor: 'rgb(50,50,50)',
        },
        text: {
            color: 'rgb(250,250,250)',
        },
    },
    light: {
        background: {
            backgroundColor: 'rgb(250,250,250)',
        },
        text: {
            color: 'rgb(50,50,50)',
        },
    },
});

export default Settings;
