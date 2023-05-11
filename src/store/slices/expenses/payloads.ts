import { Expense, FilterExpenseData } from 'model/types';

export interface addEditExpensesAction {
    expense: Expense;
}

export interface removeExpensesAction {
    id: string;
}

export interface setFilterExpenseDataAction {
    filterExpense: FilterExpenseData;
}
