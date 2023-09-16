import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const InfoText = ({ style, children }) => (
    <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
});

export default InfoText;
