import {
    createSlice,
    PayloadAction,
    createEntityAdapter,
    EntityState,
} from '@reduxjs/toolkit';
import {
    addEditExpensesAction,
    removeExpensesAction,
    setFilterExpenseDataAction,
} from './payloads';
import { Expense, FilterExpenseData } from 'model/types';
import { clearAll } from 'store/actions/actions';

export interface SliceStateExtra {
    // expenses: Expense[];
    filterExpenseData: FilterExpenseData | undefined;
}

export type SliceState = EntityState<Expense> & SliceStateExtra;

const initialState: SliceStateExtra = {
    //expenses: [],
    filterExpenseData: undefined,
};

export const ExpensesAdapter = createEntityAdapter<Expense>({
    selectId: (expense) => expense.id,
    sortComparer: (a, b) => b.date - a.date,
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: ExpensesAdapter.getInitialState(initialState),
    reducers: {
        addExpense(state, action: PayloadAction<addEditExpensesAction>) {
            ExpensesAdapter.addOne(state, action.payload.expense);
        },
        updateExpense(state, action: PayloadAction<addEditExpensesAction>) {
            ExpensesAdapter.updateOne(state, {
                id: action.payload.expense.id,
                changes: action.payload.expense,
            });
        },
        removeExpense(state, action: PayloadAction<removeExpensesAction>) {
            ExpensesAdapter.removeOne(state, action.payload.id);
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
    extraReducers: (builder) =>
        builder.addCase(clearAll, () =>
            ExpensesAdapter.getInitialState(initialState),
        ),
});

export default expensesSlice.reducer;
export const {
    addExpense,
    updateExpense,
    removeExpense,
    setFilterExpenseData,
    clearFilterExpenseData,
} = expensesSlice.actions;
