import { createSelector } from '@reduxjs/toolkit';
import { Expense } from 'model/types';
import { RootState } from 'store/store';

export const selectExpenses = (state: RootState) => state.expenses.expenses;
export const selectExpensesFilterData = (state: RootState) =>
    state.expenses.filterExpenseData;

export const selectSortedExpenses = createSelector(
    selectExpenses,
    selectExpensesFilterData,
    (expenses, filterExpenseData) => {
        const useableExpenses = [...expenses];
        const sortedExpenses = useableExpenses.sort(
            (a: Expense, b: Expense) => b.date - a.date,
        );
        if (filterExpenseData) {
            const matchedFilter = sortedExpenses.filter(
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
            return sortedExpenses;
        }
    },
);

export const selectExpensesTotalItems = createSelector(
    selectExpenses,
    (expenses) => expenses.length,
);

export const selectExpensesTotalAmount = createSelector(
    selectExpenses,
    (expenses) => {
        return expenses.reduce(
            (total, expense) => total + (expense?.amount ?? 0),
            0,
        );
    },
);
