import {
    StyleSheet,
    Pressable,
    View,
    useColorScheme,
    Linking,
    Button,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import { shortenString } from '@app/helpers';
import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import MarkerImage from '@components/common/MarkerImage';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import {
    DARK_FONT,
    LIGHT_FONT,
    SPACING_DEFAULT,
    SPACING_LARGE,
} from '@styles/styles';

const MarkerInfo = () => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const selectedMarker = useSelector(selectSelectedMarker);

    const viewImage = () => dispatch(setModal('viewImage'));

    const openDetailedView = () => dispatch(setModal('markerDetails'));

    const goToPin = () => {
        Linking.openURL(
            `maps://?ll=${selectedMarker.latitude},${selectedMarker.longitude}&z=20`
        );
    };

    return (
        <BottomSheetView style={styles.container}>
            <HeadlineText>
                {shortenString(selectedMarker?.name, 25)}
            </HeadlineText>
            <InfoTile>
                <View style={styles.infoRow}>
                    <Pressable onPress={viewImage}>
                        <MarkerImage
                            id={selectedMarker?.id}
                            style={styles.image}
                        />
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
                        <Button onPress={openDetailedView} title="Details" />
                    </View>
                </View>
            </InfoTile>
            <Button style={styles.button} onPress={goToPin} title="Go to pin" />
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
