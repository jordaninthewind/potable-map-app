import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SPACING_DEFAULT } from '@styles/styles';

const KeyboardAvoidingTextInput = forwardRef(
    ({ value, style, ...props }, ref) => {
        const colorScheme = useColorScheme();

        return (
            <BottomSheetTextInput
                ref={ref}
                autoCorrect={false}
                spellCheck={false}
                style={[styles.input[colorScheme], style]}
                placeholderTextColor={
                    colorScheme === 'dark' ? 'lightgrey' : 'grey'
                }
                value={value}
                {...props}
            />
        );
    }
);

const baseInput = {
    borderRadius: 5,
    borderWidth: 1,
    height: 60,
    fontSize: 18,
    padding: SPACING_DEFAULT,
};

const styles = StyleSheet.create({
    input: {
        light: {
            ...baseInput,
            backgroundColor: 'rgba(255,255,255,0.75)',
            borderColor: 'lightgrey',
        },
        dark: {
            ...baseInput,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: 'lightgrey',
            color: '#fff',
        },
    },
});

export default KeyboardAvoidingTextInput;
