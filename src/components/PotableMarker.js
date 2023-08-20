import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { selectTheme } from '@state/appSlice';
import { setSelectedMarker, setTempMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';

export const PotableMarker = ({ marker, selectedId = null, type = null }) => {
    const dispatch = useDispatch();
    const colorScheme = useSelector(selectTheme);
    const { latitude, longitude } = marker;

    const openMarkerInfo = () => {
        if (type) return;

        dispatch(setSelectedMarker(marker));
        dispatch(setModal('markerInfo'));
    };

    const updateMarkerLocation = ({ id, coordinate }) => {
        if (id === 'unknown') {
            dispatch(setTempMarker(coordinate));
        }
    };

    return (
        <Marker
            identifier={marker.id}
            calloutVisible={true}
            coordinate={{ latitude, longitude }}
            onPress={openMarkerInfo}
            draggable={type === 'temp'}
            onDragEnd={(e) => updateMarkerLocation(e.nativeEvent)}
        >
            <View
                style={[
                    styles[colorScheme].marker,
                    selectedId === marker.id && styles[colorScheme].selected,
                    type === 'temp' && styles[colorScheme].temp,
                ]}
            />
        </Marker>
    );
};

const baseMarker = {
    borderRadius: 100,
    backgroundColor: 'transparent',
    borderWidth: 10,
    height: 10,
    width: 10,
};

const styles = StyleSheet.create({
    dark: {
        marker: {
            ...baseMarker,
            borderColor: 'cyan',
        },
        temp: {
            borderColor: 'rgba(255,255,255,.5)',
            borderWidth: 25,
            height: 120,
            width: 120,
        },
        selected: {
            borderColor: 'white',
            height: 75,
            width: 75,
        },
    },
    light: {
        marker: {
            ...baseMarker,
            borderColor: 'cyan',
        },
        temp: {
            borderColor: 'white',
            borderWidth: 25,
            padding: 50,
        },
        selected: {
            borderColor: 'white',
            padding: 30,
        },
    },
});
