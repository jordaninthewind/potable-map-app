import { StyleSheet, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';

import { selectDeviceLocationPermissions } from '@state/appSlice';
import { selectLocation, setTempMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { getCurrentPosition } from '@services/services';
import { SPACING_DEFAULT } from '@styles/styles';
import { selectModal } from '../state/modalSlice';

const MenuGroup = () => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const deviceHasPermissions = useSelector(selectDeviceLocationPermissions);
    const isLoggedIn = useSelector(selectAuthState);
    const location = useSelector(selectLocation);
    const modal = useSelector(selectModal);

    const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

    const updatePosition = async () => await dispatch(getCurrentPosition());

    const addTempMarker = async () => {
        dispatch(setTempMarker(location));
        dispatch(setModal('addMarker'));
    };

    return (
        <>
            {!modal && (
                <View style={styles.container}>
                    {isLoggedIn && (
                        <FAB
                            icon="plus"
                            onPress={addTempMarker}
                            style={styles[colorScheme].fabStyle}
                            color={iconColor}
                        />
                    )}
                    <FAB
                        icon={'crosshairs-gps'}
                        onPress={updatePosition}
                        disabled={!deviceHasPermissions}
                        style={styles[colorScheme].fabStyle}
                        color={iconColor}
                    />
                </View>
            )}
        </>
    );
};

const fabStyle = {
    borderRadius: 50,
    margin: 10,
    opacity: 0.75,
    padding: 10,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: 10,
        marginBottom: SPACING_DEFAULT,
    },
    light: {
        fabStyle: {
            ...fabStyle,
            backgroundColor: '#fff',
            color: '#000',
        },
    },
    dark: {
        fabStyle: {
            ...fabStyle,
            backgroundColor: '#000',
            color: '#fff',
        },
    },
});

export default MenuGroup;
