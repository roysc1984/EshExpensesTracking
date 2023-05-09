import React, { FC, useMemo } from 'react';
import {
    ListRenderItemInfo,
    SectionList,
    SectionListData,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PressableOpacity from 'components/PressableOpacity';
import { BLACK_COLOR, WHITE_SMOKE_COLOR } from 'theme/themeStyles';
import { Expense } from 'model/types';
import { format } from 'date-fns';
import { ExpenseData, Section } from './types';
import { orderedExpensesData } from './utils';

interface ExpensesListProps {
    expenses: Expense[];
}

const ExpensesList: FC<ExpensesListProps> = ({ expenses }) => {
    const expensesData = useMemo(
        () => orderedExpensesData(expenses),
        [expenses],
    );

    const getRenderItemKey = (item: ExpenseData) => item.id;

    const renderItem = ({ item }: ListRenderItemInfo<ExpenseData>) => (
        <PressableOpacity>
            <View style={styles.itemRow}>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.item}>{`$${item.amount.toFixed(2)}`}</Text>
            </View>
        </PressableOpacity>
    );

    const renderSectionHeader = ({
        section,
    }: {
        section: SectionListData<ExpenseData, Section>;
    }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>
                {format(section.date, 'dd.MM.yyyy')}
            </Text>
        </View>
    );

    const renderItemSeparatorComponent = () => (
        <View style={styles.itemSeparator} />
    );

    return (
        <SectionList
            sections={expensesData}
            keyExtractor={getRenderItemKey}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={renderItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    item: {
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '400',
        fontSize: 16,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: WHITE_SMOKE_COLOR,
    },
    sectionText: {
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '400',
        fontSize: 14,
    },
    itemSeparator: {
        backgroundColor: BLACK_COLOR,
        height: 0.5,
    },
});

export default ExpensesList;
