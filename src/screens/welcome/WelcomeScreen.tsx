import React, { useCallback, useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import {
    BLACK_COLOR,
    PURPLE_COLOR,
    WHITE_COLOR,
} from '../../theme/themeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '../route';
import { RootStackParamList } from 'screens/types';
import ActionButton from 'components/ActionButton';

const INPUT_PLACEHOLDER = 'Enter Name';
const BUTTON_TEXT = 'Login';

const WelcomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState('');

    const navigateHome = useCallback(() => {
        navigation.replace(Route.HomeTabs);
    }, [navigation]);

    useEffect(() => {
        let isSubscribed = false;
        if (isSubscribed) {
            navigateHome();
        }
    }, [navigateHome]);

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onLogin = () => {
        // set name stored in AsyncStorage
        navigateHome();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View />
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder={INPUT_PLACEHOLDER}
                />
                <View style={styles.footer}>
                    <ActionButton
                        disabled={name.length === 0}
                        onPress={onLogin}
                        text={BUTTON_TEXT}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: WHITE_COLOR,
    },
    textInput: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        fontWeight: '400',
        borderColor: PURPLE_COLOR,
        borderWidth: 1,
        width: 255,
        height: 55,
        paddingHorizontal: 10,
        borderRadius: 3,
        color: BLACK_COLOR,
    },
    button: {
        backgroundColor: PURPLE_COLOR,
        width: 148,
        height: 48,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Helvetica',
        color: WHITE_COLOR,
        fontWeight: 'bold',
    },
    footer: {
        marginBottom: 30,
    },
});

export default WelcomeScreen;
