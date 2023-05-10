import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PressableOpacity from 'components/PressableOpacity';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route } from 'screens/route';
import {
    BLACK_COLOR,
    GRAY_SEPARATOR_COLOR,
    WHITE_COLOR,
} from 'theme/themeStyles';
import { RootStackParamList } from 'screens/types';
import { useDispatch } from 'react-redux';
import { removeUserName } from 'store/slices/user/reducer';

const ProfileScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(removeUserName());
        navigation.replace(Route.Welcome);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Total Expenses Items</Text>
                <Text style={styles.totalText}>{0}</Text>
            </View>
            <PressableOpacity onPress={signOut} style={styles.row}>
                <Text style={styles.title}>Sign out</Text>
            </PressableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: WHITE_COLOR,
    },
    row: {
        paddingTop: 36,
        paddingBottom: 12,
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: GRAY_SEPARATOR_COLOR,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '400',
    },
    totalText: {
        fontSize: 20,
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '700',
    },
});

export default ProfileScreen;
