import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { SPACING_LARGE } from '@styles/styles';

const InfoTile = ({ style, children }) => {
    const colorScheme = useColorScheme();

    return (
        <View
            style={[
                styles.infoContainer[colorScheme],
                styles.columnElement,
                style,
            ]}
        >
            {children}
        </View>
    );
};

const infoContainerBase = {
    borderRadius: 30,
    justifyContent: 'center',
    padding: SPACING_LARGE,
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const styles = StyleSheet.create({
    infoContainer: {
        dark: {
            ...infoContainerBase,
            backgroundColor: 'rgba(255,255,255,0.15)',
        },
        light: {
            ...infoContainerBase,
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
    },
    columnElement: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});
export default InfoTile;
