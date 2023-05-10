import React, { useState } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { BLACK_COLOR, BLUE_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'assets/icons/CloseXIcon';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';
import { StackNavigationProp, useCardAnimation } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'screens/types';
import ExpenseInputs from './components/ExpenseInputs';
import { Expense } from 'model/types';

const BUTTON_TEXT = 'Filter';
const TITLE = 'Filters';
const CLEAN_BUTTON = 'clean';

const FilterExpensesModalScreen = () => {
    const { height } = useWindowDimensions();
    const { current } = useCardAnimation();

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
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewAnimated: {
        width: '100%',
    },
    viewContainer: {
        flex: 1,
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
});

export default FilterExpensesModalScreen;
