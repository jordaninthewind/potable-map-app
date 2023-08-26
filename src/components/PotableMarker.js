import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedMarker, setTempMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';

export const PotableMarker = ({ marker, selectedId = null, type = null }) => {
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
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
                    styles[colorScheme]?.marker,
                    selectedId === marker.id && styles[colorScheme].selected,
                    type === 'temp' && styles[colorScheme].temp,
                ]}
            />
        </Marker>
    );
};

const defaultMarkerBase = {
    borderRadius: 100,
    backgroundColor: 'transparent',
    borderWidth: 10,
    height: 10,
    width: 10,
};

const focusedMarkerBase = {
    borderRadius: 100,
    borderWidth: 10,
    height: 100,
    width: 100,
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
            borderColor: 'cyan',
        },
        temp: {
            ...focusedMarkerBase,
            borderColor: 'rgba(0,0,0,.5)',
        },
        selected: {
            ...focusedMarkerBase,
            borderColor: 'white',
        },
    },
});
