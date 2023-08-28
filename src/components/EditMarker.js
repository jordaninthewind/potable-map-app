import { createRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

import { COLOR_WARNING } from '@app/constants';
import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';
import MarkerImage from '@components/common/MarkerImage';
import { deleteMarkerRemote } from '@services/services';
import { selectSelectedMarker } from '@state/markersSlice';
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

    const isAdmin = false;
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
        () => dispatch(updateMarker());
    }, [name, type, rating]);

    const goBack = () => {
        dispatch(setModal('markerInfo'));
    };

    const openCameraView = () => {
        dispatch(setModal('AddImage'));
    };

    const deleteMarker = () => dispatch(deleteMarkerRemote(marker.id));

    return (
        <KeyboardAvoidingView>
            <HeadlineText copy={'Edit Marker'} />
            <InfoTile>
                <View
                    style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Pressable onPress={openCameraView}>
                            <MarkerImage id={marker.id} editable />
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
                        <KeyboardAvoidingTextInput
                            ref={nameRef}
                            style={styles.input}
                            onChange={(e) => setName(e)}
                            placeholder="Location Name"
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
                {isAdmin && (
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
