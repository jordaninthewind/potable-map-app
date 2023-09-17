import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({ rating, onPress, style }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const name = i <= rating ? 'star' : 'star-outline';

        stars.push(
            <Icon
                key={i}
                onPress={() => onPress(i)}
                name={name}
                size={40}
                color="#FF8C00"
            />
        );
    }

    return <View style={[styles.container, style]}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
});

export default StarRating;
