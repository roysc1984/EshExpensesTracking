import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
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
import { addExpense, updateExpense } from 'store/slices/expenses/reducer';
import { getUuid } from 'common/utils';
import { convertDate, setStrDate } from './utils';
import { ExpenseInput } from './types';

const EDIT_TEXT = 'Edit Expense';
const CREATE_TEXT = 'Create Expense';
const BUTTON_TEXT_SAVE = 'Save';
const BUTTON_TEXT_CREATE = 'Create';

const CreateEditExpenseModalScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<CreateEditExpenseModalScreenProps['route']>();
    const dispatch = useDispatch();
    const [expenseData, setExpenseData] = useState<ExpenseInput | undefined>(
        route.params?.expense ? setStrDate(route.params.expense) : undefined,
    );

    const close = () => navigation.goBack();

    const onAddExpense = () => {
        if (expenseData) {
            dispatch(
                addExpense({
                    expense: {
                        ...expenseData,
                        id: getUuid().toString(),
                        date: convertDate(expenseData.date),
                    },
                }),
            );
            close();
        }
    };

    const onEditExpense = () => {
        if (expenseData) {
            dispatch(
                updateExpense({
                    expense: {
                        ...expenseData,
                        date: convertDate(expenseData.date),
                    },
                }),
            );
            close();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
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
                    disabled={!expenseData?.amount}
                    style={styles.button}
                    onPress={expenseData?.id ? onEditExpense : onAddExpense}
                    text={expenseData ? BUTTON_TEXT_SAVE : BUTTON_TEXT_CREATE}
                />
            </View>
        </KeyboardAvoidingView>
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
        paddingBottom: 65,
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
