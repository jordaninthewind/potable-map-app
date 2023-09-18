import React from 'react';
import { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';

import { setSelectedMarker, setTempMarker } from '@state/markersSlice';
import { setModal } from '@state/modalSlice';

export const PotableMarker = ({ marker, selectedId, type = null }) => {
    const dispatch = useDispatch();

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

    const isSelectedMarker = selectedId === marker.id;

    const getMarkerColor = () => {
        if (type === 'temp') return 'grey';
        if (isSelectedMarker) return 'cyan';

        return 'rgba(0,0,255,0.5)';
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
