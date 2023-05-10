import FloatingLabelInput from 'components/FloatingLabelInput';
import { Expense } from 'model/types';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BLACK_COLOR, LIGHT_GRAY_COLOR } from 'theme/themeStyles';
import { format, isValid } from 'date-fns';
import { showAmount } from './utils';

interface ExpenseInputsProps {
    expense?: Expense;
    changeExpense: (expense: Expense) => void;
}

const ExpenseInputs: FC<ExpenseInputsProps> = ({
    expense = {} as Expense,
    changeExpense,
}) => {
    const [showDate, setShowDate] = useState(
        expense.date ? format(new Date(expense.date), 'dd.MM.yyyy') : '',
    );

    useEffect(() => {
        if (!expense.date) {
            setShowDate('');
        }
    }, [expense.date]);

    const onChangeAmount = (value: string) => {
        changeExpense({
            ...expense,
            amount: parseFloat(
                value.charAt(0) === '$' ? value.slice(1) : value,
            ),
        });
    };

    const onChangeDate = (value: string) => {
        setShowDate(value);
        const newDate = new Date(value.split('.').join('-'));
        if (isValid(newDate)) {
            changeExpense({ ...expense, date: newDate.getTime() });
        } else {
            changeExpense({ ...expense, date: 0 });
        }
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
                value={showDate}
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
