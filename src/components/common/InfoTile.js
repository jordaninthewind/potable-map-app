import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { BlurView } from 'expo-blur';

import { SPACING_SMALL } from '@styles/styles';

const InfoTile = ({ style, children }) => {
    const colorScheme = useColorScheme();

    return (
        <BlurView intensity={10}>
            <View
                style={[
                    styles.infoContainer[colorScheme],
                    styles.columnElement,
                    style,
                ]}
            >
                {children}
            </View>
        </BlurView>
    );
};

const infoContainerBase = {
    borderRadius: 30,
    padding: SPACING_SMALL,
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const styles = StyleSheet.create({
    infoContainer: {
        dark: {
            ...infoContainerBase,
            backgroundColor: 'rgba(255,255,255,0.125)',
        },
        light: {
            ...infoContainerBase,
            backgroundColor: 'rgba(0,0,0,0.125)',
        },
    },
    columnElement: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});
export default InfoTile;
