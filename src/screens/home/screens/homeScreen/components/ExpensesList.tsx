import React, { FC } from 'react';
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

type ExpenseData = Omit<Expense, 'date'>;

interface Section {
    title: string;
    data: ExpenseData[];
}

interface ExpensesListProps {
    expenses: Expense[];
}

const ExpensesList: FC<ExpensesListProps> = ({ expenses }) => {
    const DATA = [
        {
            title: '30.07.2022',
            data: [
                { id: '1', title: 'Pizza', amount: 230 },
                { id: '2', title: 'Pizza', amount: 230 },
            ],
        },
        {
            title: '28.07.2022',
            data: [
                { id: '3', title: 'Pizza', amount: 230.7667 },
                { id: '4', title: 'Pizza', amount: 230 },
            ],
        },
    ];

    // const orederdExpenses = [
    //     { id: '1', title: 'Pizza', amount: 222, date: '1.07.2022' },
    //     { id: '2', title: 'Pizza2', amount: 123, date: '30.07.2022' },
    //     { id: '3', title: 'Pizza3', amount: 5222, date: '6.07.2022' },
    // ]
    //     .map((item) => item.title)
    //     .sort(
    //         (a: string, b: string) =>
    //             new Date(a).getTime() - new Date(b).getTime(),
    //     );

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
            <Text style={styles.sectionText}>{section.title}</Text>
        </View>
    );

    const renderItemSeparatorComponent = () => (
        <View style={styles.itemSeparator} />
    );

    return (
        <SectionList
            sections={DATA}
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
