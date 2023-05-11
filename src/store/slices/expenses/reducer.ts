import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addEditExpensesAction,
    removeExpensesAction,
    setFilterExpenseDataAction,
} from './payloads';
import { Expense, FilterExpenseData } from 'model/types';
import { clearAll } from 'store/actions/actions';

export type SliceState = {
    expenses: Expense[];
    filterExpenseData: FilterExpenseData | undefined;
};

const initialState: SliceState = {
    expenses: [],
    filterExpenseData: undefined,
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialState,
    reducers: {
        addExpense(state, action: PayloadAction<addEditExpensesAction>) {
            state.expenses.push(action.payload.expense);
        },
        updateExpense(state, action: PayloadAction<addEditExpensesAction>) {
            const index = state.expenses.findIndex(
                (expense) => expense.id === action.payload.expense.id,
            );
            state.expenses[index] = action.payload.expense;
        },
        removeExpense(state, action: PayloadAction<removeExpensesAction>) {
            state.expenses = state.expenses.filter(
                (expenses) => expenses.id !== action.payload.id,
            );
        },
        setFilterExpenseData(
            state,
            action: PayloadAction<setFilterExpenseDataAction>,
        ) {
            state.filterExpenseData = action.payload.filterExpense;
        },
        clearFilterExpenseData(state) {
            state.filterExpenseData = undefined;
        },
    },
    extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});

export default expensesSlice.reducer;
export const {
    addExpense,
    updateExpense,
    removeExpense,
    setFilterExpenseData,
    clearFilterExpenseData,
} = expensesSlice.actions;
