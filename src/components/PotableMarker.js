import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';

import { setSelectedMarker, setTempMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';
import { COLOR_MAGENTA } from '@constants/colors';

export const PotableMarker = ({ marker, selectedId, type = null }) => {
    const dispatch = useDispatch();

    const colorScheme = useColorScheme();
    const { latitude, longitude } = marker;

    const openMarkerInfo = () => {
        console.log('openMarkerInfo', marker);
        if (type) return;

        dispatch(setSelectedMarker(marker));
        dispatch(setModal('markerInfo'));
    };

    const updateMarkerLocation = ({ id, coordinate }) => {
        if (id === 'unknown') {
            dispatch(setTempMarker(coordinate));
        }
    };

    const isSelectedMarker = selectedId === marker.id;

    const getMarkerColor = () => {
        if (type === 'temp') return 'white';

        if (isSelectedMarker) return 'orange';

        return COLOR_MAGENTA;
    };

    return (
        <Marker
            identifier={marker.id}
            calloutVisible={true}
            coordinate={{ latitude, longitude }}
            pinColor={getMarkerColor()}
            onPress={openMarkerInfo}
            draggable={type === 'temp'}
            onDragEnd={(e) => updateMarkerLocation(e.nativeEvent)}
        />
    );
};

const markerBase = {
    borderRadius: 100,
    borderWidth: 5,
    opacity: 0.75,
};

const defaultMarkerBase = {
    ...markerBase,
    height: 10,
    width: 10,
};

const focusedMarkerBase = {
    ...markerBase,
    height: 50,
    width: 50,
};

const styles = StyleSheet.create({
    dark: {
        marker: {
            ...defaultMarkerBase,
            borderColor: 'cyan',
        },
        temp: {
            ...focusedMarkerBase,
            borderColor: 'rgba(255,255,255,.5)',
        },
        selected: {
            ...focusedMarkerBase,
            borderColor: 'white',
        },
    },
    light: {
        marker: {
            ...defaultMarkerBase,
            borderColor: COLOR_MAGENTA,
        },
        temp: {
            ...focusedMarkerBase,
            borderColor: 'white',
        },
        selected: {
            ...focusedMarkerBase,
            backgroundColor: 'transparent',
            borderColor: 'white',
        },
    },
});
