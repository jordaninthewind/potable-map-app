import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BottomNavigation as PaperBottomNavigation } from 'react-native-paper';

import Settings from '@components/Settings';
import PotableMap from '@components/PotableMap';
import MenuGroup from '@components/MenuGroup';
import ModalInterface from '@components/ModalInterface';
import UserInfo from '@components/UserInfo';
import { selectTheme } from '@state/appSlice';

const MapScreen = () => (
    <View style={{ flex: 1 }}>
        <UserInfo />
        <PotableMap />
        <MenuGroup />
        <ModalInterface />
    </View>
);

const SettingsScreen = () => (
    <View style={{ flex: 1 }}>
        <Settings />
    </View>
);

const BottomNavigation = () => {
    const colorScheme = useSelector(selectTheme);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
            key: 'map',
            title: 'Map',
            focusedIcon: 'map',
            unfocusedIcon: 'map-outline',
        },
        {
            key: 'settings',
            title: 'Settings',
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline',
        },
    ]);

    const renderScene = PaperBottomNavigation.SceneMap({
        map: MapScreen,
        settings: SettingsScreen,
    });

    return (
        <View style={styles.container}>
            <PaperBottomNavigation
                style={styles.navContainer}
                shifting={true}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%' },
    navContainer: {
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    light: {
        background: {
            backgroundColor: 'white',
        },
        icon: {
            color: 'black',
        },
    },
    dark: {
        background: {
            backgroundColor: 'black',
        },
        icon: {
            color: 'white',
        },
    },
});

export default BottomNavigation;
