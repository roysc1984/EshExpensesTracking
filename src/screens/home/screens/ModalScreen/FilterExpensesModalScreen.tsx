import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BLACK_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'assets/icons/CloseXIcon';
//import { Expense } from 'model/types';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';

export interface FilterExpensesModalScreenParams {
    onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUTTON_TEXT = 'Filter';
const TITLE = 'Filters';

const FilterExpensesModalScreen = ({ navigation, onClose }: any) => {
    const close = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <PressableOpacity onPress={close} style={styles.closeButton}>
                <CloseXIcon />
            </PressableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>{TITLE}</Text>
                <ActionButton
                    style={styles.button}
                    onPress={onClose}
                    text={BUTTON_TEXT}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT - 50,
        borderRadius: 22,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 60,
    },
    title: {
        alignSelf: 'center',
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '400',
        fontSize: 18,
        paddingVertical: 8,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    button: {
        alignSelf: 'center',
    },
});

export default FilterExpensesModalScreen;
