import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import { SPACING_DEFAULT } from '@styles/styles';

const InfoTileLayout = ({ style, children }) => {
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
    padding: SPACING_DEFAULT,
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
export default InfoTileLayout;
