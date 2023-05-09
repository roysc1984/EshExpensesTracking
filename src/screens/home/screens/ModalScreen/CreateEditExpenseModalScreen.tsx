import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BLACK_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'assets/icons/CloseXIcon';
import { Expense } from 'model/types';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';

export interface CreateEditExpenseModalParams {
    onClose: () => void;
    expenseData?: Expense;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const EDIT_TEXT = 'Edit Expense';
const CREATE_TEXT = 'Create Expense';
const BUTTON_TEXT_SAVE = 'Save';
const BUTTON_TEXT_CREATE = 'Create';

const CreateEditExpenseModalScreen = ({
    navigation,
    onClose,
    expenseData,
}: any) => {
    const close = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <PressableOpacity onPress={close} style={styles.closeButton}>
                <CloseXIcon />
            </PressableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {expenseData ? EDIT_TEXT : CREATE_TEXT}
                </Text>
                <ActionButton
                    style={styles.button}
                    onPress={onClose}
                    text={expenseData ? BUTTON_TEXT_SAVE : BUTTON_TEXT_CREATE}
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

export default CreateEditExpenseModalScreen;
