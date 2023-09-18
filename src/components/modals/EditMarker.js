import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    KeyboardAvoidingView,
    Alert,
    Vibration,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';

import HeadlineText from '@components/common/HeadlineText';
import InfoTile from '@components/common/InfoTile';
import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';
import MarkerImage from '@components/common/MarkerImage';
import StarRating from '@components/common/StarRating';
import TagChips from '@components/common/TagChips';
import { COLOR_WARNING } from '@constants/constants';
import { updateMarkerRemote, deleteMarkerRemote } from '@services/services';
import { selectSelectedMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import {
    RADIUS_DEFAULT,
    ITEM_ROW_CONTAINER,
    SPACING_SMALL,
    SPACING_DEFAULT,
} from '@styles/styles';

const EditMarker = () => {
    const dispatch = useDispatch();

    const marker = useSelector(selectSelectedMarker);

    const [name, setName] = useState(marker?.name);
    const [tags, setTags] = useState(marker?.tags || []);
    const [rating, setRating] = useState(marker?.rating);

    useEffect(() => {
        () => dispatch(updateMarker());
    }, [name, tags, rating]);

    const updateMarker = async (value) => {
        const updatedMarker = {
            name,
            tags,
            rating,
        };

        await dispatch(
            updateMarkerRemote({ markerId: marker.id, updatedMarker })
        );
    };

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

    const updateTags = (value) => {
        setTags(value);
    };

    const updateRating = (value) => {
        Vibration.vibrate();

        setRating(value);
    };

    return (
        <KeyboardAvoidingView>
            <HeadlineText>Update location details</HeadlineText>
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
                        <View style={{ marginTop: 8 }}>
                            <Text style={{ marginLeft: 8 }}>Name:</Text>
                            <KeyboardAvoidingTextInput
                                style={styles.input}
                                onChange={(e) => setName(e)}
                                placeholder="Name"
                                value={name || ''}
                            />
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <Text style={{ marginLeft: 8 }}>Tags:</Text>
                            <TagChips
                                onPress={updateTags}
                                style={{ marginLeft: 8 }}
                                tags={tags}
                            />
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <Text style={{ marginLeft: 8 }}>Rating:</Text>
                            <StarRating
                                onPress={updateRating}
                                style={{ marginLeft: 8 }}
                                rating={rating}
                            />
                        </View>
                    </View>
                </View>
            </InfoTile>
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button mode="contained" onPress={updateMarker}>
                        Update marker
                    </Button>
                </View>
                <View style={styles.button}>
                    <Button
                        mode="contained"
                        buttonColor={COLOR_WARNING}
                        onPress={deleteMarker}
                    >
                        Delete Marker
                    </Button>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button mode="outlined" onPress={goBack}>
                        Cancel
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginHorizontal: SPACING_SMALL,
    },
    buttonRow: {
        ...ITEM_ROW_CONTAINER,
        flexDirection: 'row',
        marginTop: SPACING_DEFAULT,
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
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default EditMarker;
