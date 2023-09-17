import { StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';

import { DARK_FONT, LIGHT_FONT } from '@styles/styles';

const HeadlineText = ({ style, children }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <Text variant="headlineSmall" style={[styles[colorScheme], style]}>
                {children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { justifyContent: 'center', marginBottom: 10 },
    light: {
        color: DARK_FONT,
    },
    dark: {
        color: LIGHT_FONT,
    },
});

export default HeadlineText;
