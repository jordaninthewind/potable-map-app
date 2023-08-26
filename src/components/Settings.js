import { Linking, StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { selectDeviceLocationPermissions } from '@state/appSlice';
import { selectAuthState } from '@state/userSlice';
import { signOut } from '@services/services';
import { SPACING_DEFAULT } from '@styles/styles';

const Settings = () => {
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const deviceHasPermissions = useSelector(selectDeviceLocationPermissions);
    const isLoggedIn = useSelector(selectAuthState);

    const logOut = () => dispatch(signOut());

    const openDeviceSettings = () => Linking.openSettings();

    return (
        <View
            style={[
                styles.container,
                styles.background[colorScheme],
                { paddingTop: top },
            ]}
        >
            <View style={styles.optionContainer}>
                <View style={styles.option}>
                    {/* More settings should go here */}
                </View>
                {isLoggedIn && (
                    <View style={styles.option}>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            Log out
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
                            style={styles.text[colorScheme]}
                        >
                            Location
                        </Text>
                        <Button mode={'contained'} onPress={openDeviceSettings}>
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
        paddingHorizontal: SPACING_DEFAULT,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING_DEFAULT,
    },
    optionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    option: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING_DEFAULT,
    },
    background: {
        dark: {
            backgroundColor: 'rgb(50,50,50)',
        },
        light: {
            backgroundColor: 'rgb(250,250,250)',
        },
    },
    text: {
        dark: {
            color: 'rgb(250,250,250)',
        },
        light: {
            color: 'rgb(50,50,50)',
        },
    },
});

export default Settings;
