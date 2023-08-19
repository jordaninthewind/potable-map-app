import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { selectLoading } from '@features/markersSlice';

const Loader = () => {
    const loading = useSelector(selectLoading);

    return (
        <>
            {loading && (
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={true}
                        size={'large'}
                        color="#f00"
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flex: 1,
        height: '110%',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
});

export default Loader;
