import { StyleSheet, View, useColorScheme } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { setModal } from '@state/modalSlice';
import { selectAuthState } from '@state/userSlice';
import { ITEM_ROW_CONTAINER } from '@styles/styles';

// TODO: Split login and user info into two separate components
const UserInfo = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectAuthState);
    const colorScheme = useColorScheme();

    return (
        <>
            {!isLoggedIn && (
                <View
                    style={[
                        styles.userInfoContainer[colorScheme],
                        ITEM_ROW_CONTAINER,
                    ]}
                >
                    <Text style={styles.userInfoText[colorScheme]}>
                        Not Logged In
                    </Text>
                    <Button
                        compact
                        variant="text"
                        onPress={() => dispatch(setModal('login'))}
                    >
                        Log In
                    </Button>
                </View>
            )}
        </>
    );
};

const infoContainerBase = {
    borderTopLeftRadius: 15,
    bottom: 0,
    paddingHorizontal: 15,
    position: 'absolute',
    right: 0,
};

const styles = StyleSheet.create({
    userInfoContainer: {
        light: {
            ...infoContainerBase,
            backgroundColor: 'white',
        },
        dark: {
            ...infoContainerBase,
            backgroundColor: 'black',
        },
    },
    userInfoText: {
        light: {
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
        },
        dark: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
        },
    },
});

export default UserInfo;
