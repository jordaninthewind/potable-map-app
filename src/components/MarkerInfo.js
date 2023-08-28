import {
    StyleSheet,
    Pressable,
    View,
    useColorScheme,
    Linking,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import { shortenString } from '@app/helpers';
import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import MarkerImage from '@components/common/MarkerImage';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { DARK_FONT, LIGHT_FONT, SPACING_DEFAULT } from '@styles/styles';
import { SPACING_LARGE } from '../styles/styles';

const MarkerInfo = () => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const loggedIn = useSelector(selectAuthState);

    const { id, name, latitude, longitude } = useSelector(selectSelectedMarker);

    const editMarker = () => {
        if (!loggedIn) {
            dispatch(setModal('login'));
        } else {
            dispatch(setModal('editMarker'));
        }
    };

    const viewImage = () => dispatch(setModal('viewImage'));

    const goToPin = () => {
        const url = `maps://?sll=${latitude},${longitude}&z=1`;

        Linking.openURL(url);
    };

    return (
        <BottomSheetView style={styles.container}>
            <HeadlineText copy={shortenString(name, 25)} />
            <InfoTile>
                <View style={styles.infoRow}>
                    <Pressable onPress={viewImage}>
                        <MarkerImage id={id} style={styles.image} />
                    </Pressable>
                    <View
                        style={
                            (styles.columnElement,
                            { marginLeft: SPACING_LARGE })
                        }
                    >
                        <View style={styles.columnElement}>
                            <Text style={styles.detailText[colorScheme]}>
                                ⭐️ 7.5 / 10
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                💧 Delicious
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                🧑‍💻 Link
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                📍 Distance
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                ✅ Verified: 2/26/2023
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                📝 Notes: N/A
                            </Text>
                        </View>
                        {loggedIn && (
                            <Button onPress={editMarker}>edit source</Button>
                        )}
                    </View>
                </View>
            </InfoTile>
            <Button style={styles.button} onPress={goToPin}>
                Get directions
            </Button>
        </BottomSheetView>
    );
};

const detailTextBase = {
    fontSize: 16,
    marginVertical: 5,
};

const styles = StyleSheet.create({
    button: {
        marginTop: SPACING_DEFAULT,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    container: {
        height: '100%',
        padding: 0,
    },
    locationContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        dark: {
            ...detailTextBase,
            color: LIGHT_FONT,
        },
        light: {
            ...detailTextBase,
            color: DARK_FONT,
        },
    },
    columnElement: {
        flex: 1,
    },
});

export default MarkerInfo;
