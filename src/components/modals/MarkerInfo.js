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
import { DARK_FONT, LIGHT_FONT, SPACING_DEFAULT } from '@styles/styles';

const MarkerInfo = () => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const selectedMarker = useSelector(selectSelectedMarker);

    const isNewerThanThreeMonths = () => {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        return new Date(selectedMarker.createdAt) > threeMonthsAgo;
    };

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
                            size="small"
                            style={styles.image}
                        />
                    </Pressable>
                    <View style={styles.rightContainer}>
                        <View>
                            {/* Cumulative rating */}
                            <Text style={styles.detailText[colorScheme]}>
                                ⭐️{' '}
                                {selectedMarker?.rating
                                    ? selectedMarker?.rating + ' / 5'
                                    : 'No ratings yet'}
                            </Text>
                            {/* Value maps to enum of flavor descriptions */}
                            <Text style={styles.detailText[colorScheme]}>
                                💧 Delicious
                            </Text>
                            {/* Last known position calculation against lat/long */}
                            <Text style={styles.detailText[colorScheme]}>
                                📍 Distance
                            </Text>
                            {/* How recently anyone has rated the location */}
                            <Text style={styles.detailText[colorScheme]}>
                                ✅ {isNewerThanThreeMonths() && 'Verified'}
                            </Text>
                            {/* User reported tags */}
                            <Text style={styles.detailText[colorScheme]}>
                                🏷️ {!selectedMarker.tags && 'No tags'}
                            </Text>
                            {selectedMarker.tags?.map((tag) => (
                                <Text>{tag}</Text>
                            ))}
                        </View>
                        <View>
                            <Button
                                onPress={openDetailedView}
                                title="Details"
                            />
                        </View>
                    </View>
                </View>
            </InfoTile>
            <View>
                <Button
                    style={styles.button}
                    onPress={goToPin}
                    title="Get directions"
                />
            </View>
        </BottomSheetView>
    );
};

const detailTextBase = {
    fontSize: 16,
    marginVertical: 5,
};

const styles = StyleSheet.create({
    button: {
        padding: SPACING_DEFAULT * 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 8,
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
});

export default MarkerInfo;
