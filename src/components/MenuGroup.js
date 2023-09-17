import { StyleSheet, View, useColorScheme } from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentPosition } from '@services/services';
import { selectRightHanded, selectLocationPermission } from '@state/appSlice';
import { selectLocation, setTempMarker } from '@state/markersSlice';
import { setModal, selectModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { SPACING_DEFAULT } from '@styles/styles';

const MenuGroup = () => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const deviceHasPermissions = useSelector(selectLocationPermission);
    const isLoggedIn = useSelector(selectAuthState);
    const location = useSelector(selectLocation);
    const modal = useSelector(selectModal);
    const rightHanded = useSelector(selectRightHanded);

    const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

    const updatePosition = async () => await dispatch(getCurrentPosition());

    const addTempMarker = async () => {
        dispatch(setTempMarker(location));
        dispatch(setModal('addMarkerLocation'));
    };

    return (
        <>
            {!modal && (
                <View style={[styles.container, rightHanded && { right: 0 }]}>
                    {isLoggedIn && (
                        <FAB
                            icon="plus"
                            onPress={addTempMarker}
                            style={styles[colorScheme].fabStyle}
                            color={iconColor}
                        />
                    )}
                    <FAB
                        icon="crosshairs-gps"
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
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
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
