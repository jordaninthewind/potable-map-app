import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

const PotableStatusBar = () => {
    const darkMode = useColorScheme() === 'dark';

    return <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />;
};

export default PotableStatusBar;
