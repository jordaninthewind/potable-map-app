import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';

const HeadlineText = ({ copy, style, children }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <Text variant="headlineSmall" style={[styles[colorScheme], style]}>
                {copy}
            </Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { justifyContent: 'center', marginBottom: 10 },
    light: { color: '#000' },
    dark: { color: '#fff' },
});

export default HeadlineText;
