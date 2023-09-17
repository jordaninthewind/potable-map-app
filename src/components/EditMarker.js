import { createRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';
import MarkerImage from '@components/common/MarkerImage';
import { COLOR_WARNING } from '@constants/constants';
import { deleteMarkerRemote } from '@services/services';
import { selectTempMarker, selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    RADIUS_DEFAULT,
    ITEM_ROW_CONTAINER,
    SPACING_SMALL,
} from '@styles/styles';

const EditMarker = () => {
    const dispatch = useDispatch();

    const nameRef = createRef(null);
    const typeRef = createRef(null);
    const ratingRef = createRef(null);

    const selectedMarker = useSelector(selectSelectedMarker);
    const tempMarker = useSelector(selectTempMarker);

    const marker = selectedMarker || tempMarker;

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

    const addMarker = () => {
        const newMarker = {
            ...marker,
            name,
            type,
            rating,
        };

        dispatch(addMarkerRemote(newMarker));
    };

    useEffect(() => {
        () => dispatch(updateMarker());
    }, [name, type, rating]);

    const goBack = () => {
        dispatch(setModal('markerInfo'));
    };

    const openCameraView = () => {
        dispatch(setModal('AddImage'));
    };

    const deleteMarker = () => {
        Alert.alert(`Are you sure you want to delete ${marker?.name}?`, '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => dispatch(deleteMarkerRemote(marker.id)),
            },
        ]);
    };

    return (
        <KeyboardAvoidingView>
            <HeadlineText>
                {selectedMarker ? 'Update' : 'Add'} location details
            </HeadlineText>
            <InfoTile>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageContainer}>
                        <Pressable onPress={openCameraView}>
                            <MarkerImage
                                id={marker.id}
                                editable
                                size="xSmall"
                            />
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
                        <KeyboardAvoidingTextInput
                            ref={nameRef}
                            style={styles.input}
                            onChange={(e) => setName(e)}
                            placeholder="Name"
                            value={name || ''}
                        />
                        <KeyboardAvoidingTextInput
                            ref={typeRef}
                            style={styles.input}
                            onChange={(e) => setType(e)}
                            placeholder="Type"
                            value={type || ''}
                        />
                        <KeyboardAvoidingTextInput
                            ref={ratingRef}
                            style={styles.input}
                            onChange={(e) => setRating(e)}
                            placeholder="Rating"
                            value={rating || ''}
                        />
                    </View>
                </View>
            </InfoTile>
            <View style={styles.buttonRow}>
                {tempMarker && (
                    <Button mode="contained" onPress={addMarker}>
                        Add Marker
                    </Button>
                )}
                {selectedMarker && (
                    <Button
                        mode="contained"
                        buttonColor={COLOR_WARNING}
                        onPress={deleteMarker}
                    >
                        Delete Marker
                    </Button>
                )}
                <Button mode="contained" onPress={goBack}>
                    Cancel
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        ...ITEM_ROW_CONTAINER,
        flexDirection: 'row',
        marginTop: SPACING_SMALL,
    },
    image: {
        borderRadius: RADIUS_DEFAULT,
        height: 225,
        width: 125,
    },
    imageButton: {
        backgroundColor: 'transparent',
        borderRadius: RADIUS_DEFAULT,
        height: 200,
        position: 'absolute',
        width: 100,
    },
    imageContainer: {
        ...ITEM_ROW_CONTAINER,
    },
    input: {
        marginLeft: SPACING_SMALL,
        marginTop: SPACING_SMALL,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default EditMarker;
