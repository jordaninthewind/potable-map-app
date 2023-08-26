import { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Pressable,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';

import { COLOR_WARNING } from '@app/constants';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { deleteMarkerRemote } from '@services/services';
import { ITEM_ROW_CONTAINER, SPACING_SMALL } from '@styles/styles';
import { formatImageUrl } from '@utils/markerUtils';
import HeadlineText from './common/HeadlineText';
import InfoTileLayout from './common/InfoTileLayout';

const EditMarker = () => {
    const dispatch = useDispatch();
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
        dispatch(setModal('addPicture'));
    };

    const deleteMarker = () => dispatch(deleteMarkerRemote(marker.id));

    return (
        <KeyboardAvoidingView>
            <HeadlineText copy={'Edit Marker'} />
            <InfoTileLayout>
                <View
                    style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-evenly',
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Pressable onPress={openCameraView}>
                            {marker.imageUrl ? (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: formatImageUrl({
                                            id: marker.id,
                                            size: 'small',
                                        }),
                                    }}
                                />
                            ) : (
                                <Image
                                    source={require('../../assets/raindrop.png')}
                                    style={styles.image}
                                />
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
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
            </InfoTileLayout>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        ...ITEM_ROW_CONTAINER,
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        marginTop: SPACING_SMALL,
    },
    image: {
        height: 225,
        width: 125,
        borderRadius: 25,
    },
    imageButton: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderRadius: 25,
        height: 200,
        width: 100,
    },
    imageContainer: {
        ...ITEM_ROW_CONTAINER,
    },
    input: {
        marginTop: SPACING_SMALL,
        marginLeft: SPACING_SMALL,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default EditMarker;
