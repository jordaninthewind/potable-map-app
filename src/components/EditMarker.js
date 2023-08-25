import { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Pressable,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';

import { COLOR_WARNING } from '@app/constants';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { deleteMarkerRemote } from '@services/services';
import { ELEMENT_GROUP_SPACING, ITEM_ROW_CONTAINER } from '@styles/styles';
import { formatImageUrl } from '@utils/markerUtils';
import HeadlineText from './common/HeadlineText';

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
        <KeyboardAvoidingView>
            <HeadlineText copy={'Edit Marker'} />
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
                    <KeyboardAvoidingTextInput
                        style={styles.input}
                        onChange={(e) => setName(e)}
                        placeholder="Location Name"
                        value={name || ''}
                    />
                    <KeyboardAvoidingTextInput
                        style={styles.input}
                        onChange={(e) => setType(e)}
                        placeholder="Type"
                        value={type || ''}
                    />
                    <KeyboardAvoidingTextInput
                        style={styles.input}
                        onChange={(e) => setRating(e)}
                        placeholder="Rating"
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
        </KeyboardAvoidingView>
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
    input: {
        marginTop: 5,
    },
});

export default EditMarker;
