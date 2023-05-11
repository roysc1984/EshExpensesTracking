import React, { FC, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';
import { SUVA_GRAY_COLOR } from 'theme/themeStyles';

interface FloatingLabelInputProps extends TextInputProps {
    label: string;
}

const FloatingLabelInput: FC<FloatingLabelInputProps> = ({
    label,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View>
            {isFocused && props.value && props.value.length > 0 && (
                <Text style={[styles.label]}>{label}</Text>
            )}
            <TextInput
                returnKeyType="done"
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        position: 'absolute',
        left: 0,
        fontSize: 14,
        fontFamily: 'Helvetica',
        fontWeight: '400',
        top: 0,
        color: SUVA_GRAY_COLOR,
    },
});

export default FloatingLabelInput;
