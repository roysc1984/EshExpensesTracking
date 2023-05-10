import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'assets/icons/CloseXIcon';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';
import { useRoute } from '@react-navigation/native';
import {
    CreateEditExpenseModalScreenProps,
    RootStackParamList,
} from 'screens/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ExpenseInputs from './components/ExpenseInputs';

const EDIT_TEXT = 'Edit Expense';
const CREATE_TEXT = 'Create Expense';
const BUTTON_TEXT_SAVE = 'Save';
const BUTTON_TEXT_CREATE = 'Create';

const CreateEditExpenseModalScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<CreateEditExpenseModalScreenProps['route']>();
    const [expenseData, setExpenseData] = useState(
        route.params?.expense ?? undefined,
    );
    const close = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <PressableOpacity onPress={close} style={styles.closeButton}>
                <CloseXIcon />
            </PressableOpacity>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {expenseData ? EDIT_TEXT : CREATE_TEXT}
                    </Text>
                    <ExpenseInputs
                        expense={expenseData}
                        changeExpense={setExpenseData}
                    />
                </View>
                <ActionButton
                    style={styles.button}
                    onPress={() => {}}
                    text={expenseData ? BUTTON_TEXT_SAVE : BUTTON_TEXT_CREATE}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
