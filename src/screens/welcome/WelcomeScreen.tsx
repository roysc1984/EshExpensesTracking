import React, { useCallback, useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { BLACK_COLOR, PURPLE_COLOR, WHITE_COLOR } from '../themeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableOpacity from '../../components/PressableOpacity';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '../route';
import { Screen } from '../screen';

const INPUT_PLACEHOLDER = 'Enter Name';
const BUTTON_TEXT = 'Login';

const WelcomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [name, setName] = useState('');

    const navigateHome = useCallback(() => {
        navigation.replace(Route.HomeTabs, {
            screen: Screen.Home,
        });
    }, [navigation]);

    useEffect(() => {
        let isSubscribed = true;
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
                    <PressableOpacity style={styles.button} onPress={onLogin}>
                        <Text allowFontScaling={false} style={[styles.text]}>
                            {BUTTON_TEXT}
                        </Text>
                    </PressableOpacity>
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
    },
    textInput: {
        fontSize: 14,
        borderColor: PURPLE_COLOR,
        borderWidth: 1,
        width: 255,
        height: 55,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: BLACK_COLOR,
    },
    button: {
        backgroundColor: PURPLE_COLOR,
        width: 148,
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: WHITE_COLOR,
        fontWeight: 'bold',
    },
    footer: {
        marginBottom: 30,
    },
});

export default WelcomeScreen;