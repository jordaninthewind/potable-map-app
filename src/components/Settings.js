import {
    Linking,
    StyleSheet,
    Switch,
    View,
    useColorScheme,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import InfoTile from '@components/common/InfoTile';
import { signOut } from '@services/services';
import {
    selectDevMode,
    selectLocationPermission,
    setDevMode,
    selectRightHanded,
    setRightHanded,
} from '@state/appSlice';
import { selectAuthState } from '@state/userSlice';
import { SPACING_DEFAULT } from '@styles/styles';
import { selectLocation } from '../state/markersSlice';

const Settings = () => {
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();

    const { top } = useSafeAreaInsets();
    const deviceHasPermissions = useSelector(selectLocationPermission);
    const isLoggedIn = useSelector(selectAuthState);
    const devMode = useSelector(selectDevMode);
    const rightHanded = useSelector(selectRightHanded);
    const location = useSelector(selectLocation);

    const logOut = () => dispatch(signOut());
    const toggleDevMode = () => dispatch(setDevMode(!devMode));
    const openDeviceSettings = () => Linking.openSettings();

    const toggleHand = () => {
        dispatch(setRightHanded(!rightHanded));
    };

    return (
        <View
            style={[
                styles.container,
                styles.background[colorScheme],
                { paddingTop: top },
            ]}
        >
            <View style={styles.optionContainer}>
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
                <View style={styles.option}>
                    <Text
                        variant="headlineSmall"
                        style={styles.text[colorScheme]}
                    >
                        Right Handed Mode
                    </Text>
                    <Switch onValueChange={toggleHand} value={rightHanded} />
                </View>
                <View style={styles.option}>
                    <Text
                        variant="headlineSmall"
                        style={styles.text[colorScheme]}
                    >
                        Dev Mode
                    </Text>
                    <Switch onValueChange={toggleDevMode} value={devMode} />
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
            </View>
            {devMode && (
                <InfoTile style={{ padding: 24, marginBottom: 16 }}>
                    <View style={styles.infoSection}>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            Device Info
                        </Text>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            Current Latitude: {location.latitude}
                        </Text>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            Current Longitude: {location.longitude}
                        </Text>
                    </View>
                    <View>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            App Info
                        </Text>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            Version
                        </Text>
                        <Text
                            variant="headlineSmall"
                            style={styles.text[colorScheme]}
                        >
                            1.0.0
                        </Text>
                    </View>
                </InfoTile>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        dark: {
            backgroundColor: 'rgb(50,50,50)',
        },
        light: {
            backgroundColor: 'rgb(250,250,250)',
        },
    },
    container: {
        flex: 1,
        paddingHorizontal: SPACING_DEFAULT,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING_DEFAULT,
    },
    infoSection: {
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
