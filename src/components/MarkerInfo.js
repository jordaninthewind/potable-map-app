import { useState } from 'react';
import { Image, StyleSheet, Pressable, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { shortenString } from '@app/helpers';
import { selectTheme } from '@state/appSlice';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { formatImageUrl } from '@utils/markerUtils';
import HeadlineText from './common/HeadlineText';

const MarkerInfo = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectAuthState);
    const colorScheme = useSelector(selectTheme);
    const { id, longitude, latitude, name, imageUrl, rating, notes } =
        useSelector(selectSelectedMarker);

    const [image, setImage] = useState(formatImageUrl({ id, size: 'small' }));

    const editMarkerInfo = () => {
        if (!isLoggedIn) {
            dispatch(setModal('login'));
        } else {
            dispatch(setModal('editMarker'));
        }
    };

    const viewImage = () => {
        dispatch(setModal('viewImage'));
    };

    return (
        <BottomSheetScrollView>
            <HeadlineText copy={'Marker Info'} />
            <View
                style={[
                    styles.infoContainer[colorScheme],
                    styles.columnElement,
                ]}
            >
                <View>
                    <Text style={styles.detailText[colorScheme]}>
                        Water Quality: 7.5 / 10
                    </Text>
                    <Text style={styles.detailText[colorScheme]}>
                        Longitude: {shortenString(longitude.toString(), 8)}
                    </Text>
                    <Text style={styles.detailText[colorScheme]}>
                        Latitude: {shortenString(latitude.toString(), 8)}
                    </Text>
                    <Text style={styles.detailText[colorScheme]}>
                        Taste: {rating > 5 ? 'Good' : 'Not Good'}
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
                        Notes: {notes}
                    </Text>
                </View>
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
            </View>
            <View style={styles.columnElement}>
                <Button mode="contained" onPress={editMarkerInfo}>
                    {isLoggedIn ? 'edit source' : 'login to edit'}
                </Button>
            </View>
        </BottomSheetScrollView>
    );
};

const infoContainerBase = {
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
};

const styles = StyleSheet.create({
    locationContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
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
    infoContainer: {
        dark: {
            ...infoContainerBase,
            backgroundColor: 'rgba(255,255,255,0.15)',
        },
        light: {
            ...infoContainerBase,
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
    },
    infoContainerText: {},
    detailText: {
        dark: {
            marginVertical: 5,
            color: 'rgba(255,255,255,.75)',
        },
        light: {
            marginVertical: 5,
            color: 'black',
        },
    },
    columnElement: {
        marginVertical: 10,
    },
    image: { height: 200, width: 100, borderRadius: 25 },
});

export default MarkerInfo;
