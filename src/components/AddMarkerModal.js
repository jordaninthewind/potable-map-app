import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from 'react-native-paper';
import { GeoPoint } from 'firebase/firestore';

import KeyboardAvoidingTextInput from '@components/common/KeyboardAvoidingTextInput';
import HeadlineText from '@components/common/HeadlineText';
import {
    selectLoading,
    resetTempMarker,
    selectTempMarker,
} from '@state/markersSlice';
import { clearModal } from '@state/modalSlice';
import { addMarkerRemote, getLocalMarkers } from '@services/services';
import {
    BASE_BUTTON,
    ELEMENT_GROUP_SPACING,
    ITEM_ROW_CONTAINER,
    SPACING_DEFAULT,
} from '@styles/styles';
import { selectUserEmail } from '@state/userSlice';

const AddMarkerModal = () => {
    const dispatch = useDispatch();

    const tempMarker = useSelector(selectTempMarker);
    const loading = useSelector(selectLoading);
    const userEmail = useSelector(selectUserEmail);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        return () => {
            dispatch(resetTempMarker());
        };
    }, []);

    const structureMarker = () => ({
        name,
        type: 'water fountain',
        description,
        notes,
        rating,
        createdBy: userEmail,
        location: new GeoPoint(tempMarker?.latitude, tempMarker?.longitude),
    });

    const onSubmit = () => {
        dispatch(addMarkerRemote(structureMarker()));
        dispatch(getLocalMarkers());
        dispatch(clearModal());
    };

    return (
        <View>
            <HeadlineText copy="Add a water source">
                <Text>Long press on the marker to drag</Text>
            </HeadlineText>
            <View style={{ ...ELEMENT_GROUP_SPACING }}>
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    placeholder="Location Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={(event) => setDescription(event)}
                />
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={(event) => setNotes(event)}
                />
                <KeyboardAvoidingTextInput
                    style={styles.input}
                    placeholder="Rating"
                    value={rating}
                    onChangeText={(event) => setRating(event)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    disabled={!name}
                    onPress={onSubmit}
                    loading={loading}
                >
                    Add Marker
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        ...ITEM_ROW_CONTAINER,
        marginTop: SPACING_DEFAULT,
    },
    buttonStyle: {
        ...BASE_BUTTON,
    },
    input: {
        marginTop: 5,
    },
});

export default AddMarkerModal;
