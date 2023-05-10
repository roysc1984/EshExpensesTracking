import FloatingLabelInput from 'components/FloatingLabelInput';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { BLACK_COLOR, LIGHT_GRAY_COLOR } from 'theme/themeStyles';
import { showAmount } from '../utils';
import { ExpenseInput } from '../types';

interface ExpenseInputsProps {
    expense?: ExpenseInput;
    changeExpense: (expense: ExpenseInput) => void;
}

const ExpenseInputs: FC<ExpenseInputsProps> = ({
    expense = {} as ExpenseInput,
    changeExpense,
}) => {
    const onChangeAmount = (value: string) => {
        changeExpense({
            ...expense,
            amount: parseFloat(
                value.charAt(0) === '$' ? value.slice(1) : value,
            ),
        });
    };

    const onChangeDate = (value: string) => {
        changeExpense({ ...expense, date: value });
    };

    const onChangeTitle = (value: string) => {
        changeExpense({ ...expense, title: value });
    };

    return (
        <View>
            <FloatingLabelInput
                style={styles.textInput}
                value={expense.title}
                onChangeText={onChangeTitle}
                placeholder={'Title'}
                returnKeyType="done"
                label="Title"
            />
            <FloatingLabelInput
                style={styles.textInput}
                value={showAmount(expense.amount)}
                onChangeText={onChangeAmount}
                placeholder={'Amount'}
                keyboardType={'numeric'}
                maxLength={10}
                returnKeyType="done"
                label="Amount"
            />
            <FloatingLabelInput
                style={styles.textInput}
                value={expense.date ? `${expense.date}` : ''}
                onChangeText={onChangeDate}
                placeholder={'Date'}
                keyboardType={'numeric'}
                returnKeyType="done"
                label="Date"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Helvetica',
        fontSize: 18,
        fontWeight: '400',
        borderBottomWidth: 1,
        borderBottomColor: LIGHT_GRAY_COLOR,
        marginHorizontal: 32,
        color: BLACK_COLOR,
        paddingVertical: 8,
        marginVertical: 20,
    },
});

export default ExpenseInputs;
