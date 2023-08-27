import { useState } from 'react';
import {
    Image,
    StyleSheet,
    Pressable,
    View,
    useColorScheme,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import { shortenString } from '@app/helpers';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { formatImageUrl } from '@utils/markerUtils';
import HeadlineText from '@components/common/HeadlineText';
import InfoTileLayout from './common/InfoTileLayout';
import { SPACING_DEFAULT } from '@styles/styles';

const MarkerInfo = () => {
    const dispatch = useDispatch();

    const loggedIn = useSelector(selectAuthState);
    const colorScheme = useColorScheme();

    const marker = useSelector(selectSelectedMarker);

    const [image, setImage] = useState(formatImageUrl({ id: marker.id }));

    const editMarkerInfo = () => {
        if (!loggedIn) {
            dispatch(setModal('login'));
        } else {
            dispatch(setModal('editMarker'));
        }
    };

    const viewImage = () => {
        dispatch(setModal('viewImage'));
    };

    return (
        <BottomSheetView style={styles.container}>
            <HeadlineText copy={name} />
            <InfoTileLayout>
                <View style={styles.locationContainer}>
                    <View style={styles.infoRow}>
                        {image ? (
                            <Pressable onPress={viewImage}>
                                <Image
                                    source={{ url: image }}
                                    onError={() => setImage(null)}
                                    style={styles.image}
                                />
                            </Pressable>
                        ) : (
                            <Image
                                source={require('../../assets/raindrop.png')}
                                style={styles.image}
                            />
                        )}
                        <View>
                            <Text style={styles.detailText[colorScheme]}>
                                Water Quality: 7.5 / 10
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                Taste: 'Good'
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                Reference: N/A
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                Distance from here: 500 ft
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                Verified: 2/26/2023
                            </Text>
                            <Text style={styles.detailText[colorScheme]}>
                                Notes: N/A
                            </Text>
                        </View>
                    </View>
                    {loggedIn && (
                        <View style={{ marginTop: SPACING_DEFAULT }}>
                            <Button onPress={editMarkerInfo}>
                                edit source
                            </Button>
                        </View>
                    )}
                </View>
            </InfoTileLayout>
        </BottomSheetView>
    );
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
    nameContainer: {
        dark: {
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 30,
            justifyContent: 'center',
            paddingVertical: 10,
        },
        light: {
            alignItems: 'center',
            backgroundColor: 'rgba(255,0,0,0.1)',
            borderRadius: 30,
            justifyContent: 'center',
            paddingVertical: 10,
        },
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        dark: {
            FontFace: 'Roboto',
            fontSize: 16,
            marginVertical: 5,
            color: 'white',
        },
        light: {
            marginVertical: 5,
            color: 'black',
        },
    },
    columnElement: {
        marginVertical: 10,
    },
    image: {
        height: 225,
        width: 125,
        borderRadius: 25,
    },
});

export default MarkerInfo;
