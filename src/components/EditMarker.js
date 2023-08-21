import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput } from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { COLOR_WARNING } from '@app/constants';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { deleteMarkerRemote } from '@services/services';
import { ITEM_ROW_CONTAINER } from '@styles/styles';
import { ELEMENT_GROUP_SPACING } from '../styles/styles';

const EditMarker = () => {
    const dispatch = useDispatch();
    const marker = useSelector(selectSelectedMarker);

    const [name, setName] = useState(marker?.name);
    const [type, setType] = useState(marker?.type);
    const [rating, setRating] = useState(marker?.rating);

    const updateMarker = () => {
        const updatedMarker = {
            ...marker,
            name,
            type,
            rating,
        };

        dispatch(updateMarkerRemote(updatedMarker));
    };

    useEffect(() => {
        () => dispatch(updateMarker());
    }, [name, type, rating]);

    const goBack = () => {
        dispatch(setModal('markerInfo'));
    };

    const openCameraView = () => {
        dispatch(setModal('addPicture'));
    };

    const deleteMarker = () => dispatch(deleteMarkerRemote(marker));

    return (
        <BottomSheetScrollView>
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
                Edit Marker
            </Text>
            <View style={{ ...ELEMENT_GROUP_SPACING }}>
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
            <View style={styles.buttonRow}>
                <Button mode="outlined" onPress={openCameraView}>
                    Add a Picture
                </Button>
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
});

export default EditMarker;
