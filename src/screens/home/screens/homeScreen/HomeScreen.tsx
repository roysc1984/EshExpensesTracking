import { SlidersIcon } from 'assets/icons/SlidersIcon';
import PressableOpacity from 'components/PressableOpacity';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK_COLOR, GRAY_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import ExpensesList from './components/ExpensesList';
import CreateEditExpenseModal, {
    CreateEditExpenseModalRef,
} from './components/CreateEditExpenseModal';
import { Expense } from 'model/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'screens/types';
import { Route } from 'screens/route';

const TITLE = 'Total Expenses:';
const FILTER_BUTTON_TEXT = 'Filters';

const HomeScreen = () => {
    const modalRef = useRef<CreateEditExpenseModalRef>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const total = 1024.0566;
    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.titleHeader}>{TITLE}</Text>
            <Text style={styles.sumHeader}>{`$${total.toFixed(2)}`}</Text>
        </View>
    );

    const showModalEdit = (expense: Expense) => {
        //  modalRef?.current?.open(expense);
        navigation.navigate(Route.ModalExpense, {
            expense,
        });
    };

    const showModalFilters = () => {
        navigation.navigate(Route.ModalFilter);
    };

    const renderFiltersButton = () => (
        <PressableOpacity onPress={showModalFilters}>
            <View style={styles.filterButton}>
                <SlidersIcon />
                <Text style={styles.filterText}>{FILTER_BUTTON_TEXT}</Text>
            </View>
        </PressableOpacity>
    );

    return (
        <SafeAreaView edges={['left', 'right', 'top']} style={styles.container}>
            {renderHeader()}
            {renderFiltersButton()}
            <View>
                <ExpensesList
                    expenses={[
                        {
                            id: '1',
                            title: 'Pizza',
                            amount: 222,
                            date: new Date('2022-08-11').getTime(),
                        },
                        {
                            id: '2',
                            title: 'Pizza2',
                            amount: 123,
                            date: new Date().getTime(),
                        },
                    ]}
                    onEditPress={showModalEdit}
                />
            </View>
            <CreateEditExpenseModal ref={modalRef} onClose={() => {}} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
    },
    header: {
        paddingBottom: 21,
        flexDirection: 'row',
        paddingHorizontal: 14,
    },
    titleHeader: {
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '700',
        fontSize: 16,
    },
    sumHeader: {
        paddingHorizontal: 10,
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '400',
        fontSize: 18,
    },
    filterButton: {
        margin: 11,
        backgroundColor: GRAY_COLOR,
        width: 94,
        height: 28,
        borderRadius: 60,
        paddingHorizontal: 13,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    filterText: {
        fontFamily: 'Helvetica',
        color: BLACK_COLOR,
        fontWeight: '700',
        fontSize: 12,
    },
});

export default HomeScreen;
