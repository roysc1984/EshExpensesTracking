import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addEditExpensesAction, removeExpensesAction } from './payloads';
import { Expense } from 'model/types';

type SliceState = {
    expenses: Expense[];
};

const initialState: SliceState = {
    expenses: [],
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
        removeAllExpenses(state) {
            state.expenses = [];
        },
    },
});

export default expensesSlice.reducer;
export const { addExpense, updateExpense, removeExpense, removeAllExpenses } =
    expensesSlice.actions;
