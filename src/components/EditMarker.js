import { useEffect, useState } from 'react';
import { Image, StyleSheet, Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput } from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { COLOR_WARNING } from '@app/constants';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { deleteMarkerRemote } from '@services/services';
import { ELEMENT_GROUP_SPACING, ITEM_ROW_CONTAINER } from '@styles/styles';
import { formatImageUrl } from '@utils/markerUtils';

const EditMarker = () => {
    const dispatch = useDispatch();

    const marker = useSelector(selectSelectedMarker);

    const [name, setName] = useState(marker?.name);
    const [type, setType] = useState(marker?.type);
    const [rating, setRating] = useState(marker?.rating);

    const updateMarker = async (value) => {
        const updatedMarker = {
            ...value,
        };

        await dispatch(
            updateMarkerRemote({ markerId: marker.id, updatedMarker })
        );
    };

    useEffect(() => {
        mapRef.current.animateToRegion(
            {
                latitude: selectedMarker.latitude - 0.045,
                longitude: selectedMarker.longitude,
                // latitudeDelta: 0.01,
                // longitudeDelta: 0.01,
            },
            750
        );
    })

    useEffect(() => {
        () => dispatch(updateMarker());
    }, [name, type, rating]);

    const goBack = () => {
        dispatch(setModal('markerInfo'));
    };

    const openCameraView = () => {
        dispatch(setModal('addPicture'));
    };

    const deleteMarker = () => dispatch(deleteMarkerRemote(marker.id));

    return (
        <BottomSheetScrollView>
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
                Edit Marker
            </Text>
            <View
                style={[ITEM_ROW_CONTAINER, { flexDirection: 'row-reverse' }]}
            >
                {marker.imageUrl && (
                    <View style={styles.imageRow}>
                        <View style={styles.imageContainer}>
                            <Pressable onPress={openCameraView}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: formatImageUrl({
                                            id: marker.id,
                                            size: 'small',
                                        }),
                                    }}
                                />
                            </Pressable>
                        </View>
                    </View>
                )}
                <View
                    style={{
                        ...ELEMENT_GROUP_SPACING,
                        flex: 1,
                        marginRight: 20,
                    }}
                >
                    <TextInput
                        mode="outlined"
                        label="Name"
                        onChange={(e) => setName(e)}
                        value={name || ''}
                    />
                    <TextInput
                        mode="outlined"
                        label="Type"
                        onChange={(e) => setType(e)}
                        value={type || ''}
                    />
                    <TextInput
                        mode="outlined"
                        label="Rating"
                        onChange={(e) => setRating(e)}
                        value={rating || ''}
                    />
                </View>
            </View>
            <View style={styles.buttonRow}>
                {!marker.imageUrl && (
                    <Button mode="outlined" onPress={openCameraView}>
                        Add an image
                    </Button>
                )}
                <Button
                    mode="contained"
                    buttonColor={COLOR_WARNING}
                    onPress={deleteMarker}
                >
                    Delete Marker
                </Button>
            </View>
            <View style={[ITEM_ROW_CONTAINER, { marginTop: 10 }]}>
                <Button mode="text" onPress={goBack}>
                    Cancel
                </Button>
            </View>
        </BottomSheetScrollView>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        ...ITEM_ROW_CONTAINER,
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    image: { height: 200, width: 100, borderRadius: 25 },
    imageContainer: {
        ...ITEM_ROW_CONTAINER,
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
});

export default EditMarker;
