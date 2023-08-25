import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const HeadlineText = ({ copy, style }) => {
    return (
        <Text variant="headlineSmall" style={[styles.container, style]}>
            {copy}
        </Text>
    );
};

const styles = StyleSheet.create({
    container: { textAlign: 'center', marginBottom: 10 },
});

export default HeadlineText;
