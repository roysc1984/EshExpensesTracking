import React, { useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'components/icons/CloseXIcon';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';
import { StackNavigationProp, useCardAnimation } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'screens/types';
import ExpenseInputs from './components/ExpenseInputs';
import { ExpenseInput } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
    setFilterExpenseData,
    clearFilterExpenseData,
} from 'store/slices/expenses/reducer';
import {
    convertDate,
    convertMount,
    isValidAmount,
    isValidDate,
    setStrDateFilter,
} from './utils';
import { selectExpensesFilterData } from 'store/slices/expenses/selectors';

const BUTTON_TEXT = 'Filter';
const TITLE = 'Filters';
const CLEAN_BUTTON = 'clean';

const FilterExpensesModalScreen = () => {
    const { height } = useWindowDimensions();
    const { current } = useCardAnimation();
    const dispatch = useDispatch();
    const expenseFilter = useSelector(selectExpensesFilterData);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [expenseData, setExpenseData] = useState<ExpenseInput | undefined>(
        expenseFilter
            ? {
                  ...setStrDateFilter(expenseFilter),
              }
            : undefined,
    );
    const close = () => navigation.goBack();

    const clean = () => setExpenseData(undefined);

    const renderHeader = () => (
        <View style={styles.headerButtons}>
            <PressableOpacity onPress={clean} style={styles.headerButton}>
                <Text style={styles.clean}>{CLEAN_BUTTON}</Text>
            </PressableOpacity>
            <Text style={styles.title}>{TITLE}</Text>
            <PressableOpacity onPress={close} style={styles.headerButton}>
                <CloseXIcon />
            </PressableOpacity>
        </View>
    );

    const onFilter = () => {
        if (expenseData) {
            dispatch(
                setFilterExpenseData({
                    filterExpense: {
                        ...expenseData,
                        date:
                            expenseData.date && isValidDate(expenseData.date)
                                ? convertDate(expenseData.date)
                                : undefined,
                        amount: convertMount(expenseData.amount),
                    },
                }),
            );
        } else if (expenseFilter) {
            dispatch(clearFilterExpenseData());
        }
        close();
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Pressable
                style={[StyleSheet.absoluteFill, styles.backDrop]}
                onPress={close}
            />
            <Animated.View
                style={[
                    {
                        height: height,
                        transform: [
                            {
                                translateY: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [height, height * 0.4],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                    styles.viewAnimated,
                ]}
            >
                <View style={[styles.viewContainer, { height: height }]}>
                    {renderHeader()}
                    <View style={[styles.content, { height: height * 0.55 }]}>
                        <ExpenseInputs
                            style={styles.inputs}
                            expense={expenseData}
                            changeExpense={setExpenseData}
                        />
                        <ActionButton
                            style={styles.button}
                            onPress={onFilter}
                            text={BUTTON_TEXT}
                        />
                    </View>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    viewAnimated: {
        width: '100%',
    },
    viewContainer: {
        backgroundColor: WHITE_COLOR,
        borderRadius: 22,
    },
    content: {
        justifyContent: 'space-between',
        paddingBottom: 60,
    },
    backDrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 0.5,
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
    headerButton: {
        padding: 4,
    },
    inputs: {
        marginHorizontal: 24,
    },
});

export default FilterExpensesModalScreen;
