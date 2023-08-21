import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput } from 'react-native-paper';
import { GeoPoint } from 'firebase/firestore';

import {
    selectLoading,
    resetTempMarker,
    selectTempMarker,
} from '@state/markersSlice';
import { clearModal } from '@state/modalSlice';
import { addMarkerRemote, getLocalMarkers } from '@services/services';
import { BASE_BUTTON, ITEM_ROW_CONTAINER } from '@styles/styles';
import { ELEMENT_GROUP_SPACING } from '../styles/styles';

const AddMarkerModal = () => {
    const dispatch = useDispatch();

    const tempMarker = useSelector(selectTempMarker);
    const loading = useSelector(selectLoading);

    const [name, setName] = useState('');
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
        notes,
        rating,
        createdBy: useSelector(selectUser),
        location: new GeoPoint(tempMarker.latitude, tempMarker.longitude),
    });

    const onSubmit = () => {
        dispatch(addMarkerRemote(structureMarker()));
        dispatch(getLocalMarkers());
        dispatch(clearModal());
    };

    return (
        <View>
            <Text variant="headlineSmall" style={{ textAlign: 'center' }}>
                Add a water source
            </Text>
            <View style={{ ...ELEMENT_GROUP_SPACING }}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Location Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    multiline
                    label="Notes"
                    value={notes}
                    onChangeText={(event) => setNotes(event)}
                />
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Rating"
                    value={rating}
                    onChangeText={(event) => setRating(event)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    disabled={!name && !notes && !rating}
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
        marginTop: 20,
    },
    buttonStyle: {
        ...BASE_BUTTON,
    },
    input: {
        marginTop: 5,
    },
});

export default AddMarkerModal;
