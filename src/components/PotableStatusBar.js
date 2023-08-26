import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

const PotableStatusBar = () => {
    const colorScheme = useColorScheme();

    return <StatusBar style={colorScheme} />;
};

export default PotableStatusBar;
