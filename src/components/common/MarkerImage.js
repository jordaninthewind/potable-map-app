import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Raindrop from '@assets/raindrop.png';
import { downloadImageUrl } from '@services/storageService';
import { RADIUS_DEFAULT } from '@styles/styles';
import { RADIUS_LARGE } from '../../styles/styles';

const MarkerImage = ({ id, style, editable, size = 'small', ...props }) => {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getImage = async () => {
            const url = await downloadImageUrl({ id });

            setUrl(url);
        };

        getImage();
    }, [id]);

    return (
        <>
            <Image
                source={url ? { url } : Raindrop}
                style={[styles.imageContainer, styles.image[size], style]}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                {...props}
            />
            {loading && (
                <View style={styles.imageLoader}>
                    <ActivityIndicator size="large" color={'orange'} />
                </View>
            )}
            {editable && (
                <View style={styles.editOverlay}>
                    <Icon
                        color="rgba(255,255,255,.75)"
                        name="camera"
                        size={40}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        position: 'relative',
    },
    imageLoader: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: RADIUS_LARGE,
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
    },
    image: {
        small: {
            height: 225,
            width: 125,
            borderRadius: RADIUS_LARGE,
        },
        large: {
            height: 500,
            width: 350,
            borderRadius: 50,
        },
    },
    editOverlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: RADIUS_LARGE,
        height: '100%',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
    },
});

export default MarkerImage;
