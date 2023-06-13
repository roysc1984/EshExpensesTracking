import { createSelector } from '@reduxjs/toolkit';
import { ExpensesAdapter } from './reducer';
import { RootState } from 'store/store';

export const selectExpenses = (state: RootState) =>
    ExpensesAdapter.getSelectors().selectAll(state.expenses);

export const selectExpensesFilterData = (state: RootState) =>
    state.expenses.filterExpenseData;

export const selectFilterExpenses = createSelector(
    selectExpenses,
    selectExpensesFilterData,
    (expenses, filterExpenseData) => {
        if (filterExpenseData) {
            const matchedFilter = expenses.filter(
                (expense) =>
                    (filterExpenseData?.amount
                        ? expense.amount === filterExpenseData.amount
                        : true) &&
                    (filterExpenseData?.title
                        ? expense.title === filterExpenseData.title
                        : true) &&
                    (filterExpenseData?.date
                        ? expense.date === filterExpenseData.date
                        : true),
            );

            return matchedFilter;
        } else {
            return expenses;
        }
    },
);

export const selectExpensesTotalItems = createSelector(
    selectExpenses,
    (expenses) => expenses.length,
);

export const selectExpensesTotalAmount = createSelector(
    selectFilterExpenses,
    (expenses) => {
        return expenses.reduce(
            (total, expense) => total + (expense?.amount ?? 0),
            0,
        );
    },
);
