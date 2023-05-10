import { Expense } from 'model/types';

export interface addEditExpensesAction {
    expense: Expense;
}

export interface removeExpensesAction {
    id: string;
}
