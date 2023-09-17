import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

const tags = [
    { value: 'dog bowl', icon: 'dog' },
    { value: 'water fountain', icon: 'fountain' },
    { value: 'bottle refill', icon: 'bottle-soda' },
];

const TagChips = ({ selectedTags, onPress, style }) => {
    const updateChips = (value) => {
        console.log(selectedTags);
        if (selectedTags.includes(value)) {
            const tags = selectedTags.filter((tag) => tag !== value);

            onPress(tags);
        } else {
            onPress([...selectedTags, value]);
        }
    };

    return (
        <View style={[styles.container, style]}>
            {tags.map(({ value, icon }) => {
                const selected = selectedTags.includes(value);

                return (
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
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
    chip: {
        margin: 2,
        backgroundColor: 'rgba(255,255,255,0.125)',
    },
    selected: {
        backgroundColor: 'white',
    },
});

export default TagChips;
