import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const tagTypes = [
    { value: 'dog bowl', icon: 'dog' },
    { value: 'water fountain', icon: 'fountain' },
    { value: 'bottle refill', icon: 'bottle-soda' },
];

const TagChips = ({ tags = [], onPress, style }) => {
    const updateChips = (value) => {
        if (tags?.includes(value)) {
            const tags = tags.filter((tag) => tag !== value);

            onPress(tags);
        } else {
            onPress([...tags, value]);
        }
    };

    return (
        <ScrollView horizontal style={[styles.container, style]}>
            {tagTypes.map(({ value, icon }) => {
                const selected = tags?.includes(value);

                return (
                    <View>
                        <Chip
                            selected={selected}
                            onPress={() => updateChips(value)}
                            icon={icon}
                            key={value}
                            style={[styles.chip, selected && styles.selected]}
                            mode="outlined"
                        >
                            {value}
                        </Chip>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    chip: {
        backgroundColor: 'rgba(255,255,255,0.125)',
        margin: 2,
    },
    selected: {
        backgroundColor: 'white',
    },
});

export default TagChips;
