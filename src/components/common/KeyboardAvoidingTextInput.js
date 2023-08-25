import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../state/appSlice';

const KeyboardAvoidingTextInput = forwardRef(
    ({ value, style, ...props }, ref) => {
        const isDarkMode = useSelector(selectTheme) === 'dark';

        return (
            <BottomSheetTextInput
                ref={ref}
                style={[isDarkMode ? styles.dark : styles.input, style]}
                placeholderTextColor={isDarkMode ? 'lightgrey' : 'grey'}
                value={value}
                {...props}
            />
        );
    }
);

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        padding: 15,
        borderColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        height: 60,
        alignItems: 'center',
        alignContent: 'center',
    },
    dark: {
        backgroundColor: 'transparent',
        padding: 15,
        borderColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        height: 60,
        alignItems: 'center',
        alignContent: 'center',
        color: '#fff',
    },
});

export default KeyboardAvoidingTextInput;
