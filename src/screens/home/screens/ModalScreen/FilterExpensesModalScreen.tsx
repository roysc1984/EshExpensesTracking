import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BLACK_COLOR, BLUE_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'assets/icons/CloseXIcon';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'screens/types';
import ExpenseInputs from './components/ExpenseInputs';
import { Expense } from 'model/types';

const BUTTON_TEXT = 'Filter';
const TITLE = 'Filters';
const CLEAN_BUTTON = 'clean';

const FilterExpensesModalScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [expenseData, setExpenseData] = useState<Expense | undefined>(
        undefined,
    );
    const close = () => navigation.goBack();

    const clean = () => setExpenseData(undefined);

    const renderHeader = () => (
        <View style={styles.headerButtons}>
            <PressableOpacity onPress={clean}>
                <Text style={styles.clean}>{CLEAN_BUTTON}</Text>
            </PressableOpacity>
            <Text style={styles.title}>{TITLE}</Text>
            <PressableOpacity onPress={close}>
                <CloseXIcon />
            </PressableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.content}>
                <ExpenseInputs
                    expense={expenseData}
                    changeExpense={setExpenseData}
                />
                <ActionButton
                    style={styles.button}
                    onPress={() => {}}
                    text={BUTTON_TEXT}
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
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
    },
    clean: {
        alignSelf: 'center',
        fontFamily: 'Helvetica',
        color: BLUE_COLOR,
        fontWeight: '400',
    },
});

export default FilterExpensesModalScreen;
