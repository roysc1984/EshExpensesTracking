import { Expense } from 'model/types';

export interface Section {
    date: number;
    data: ExpenseData[];
}

export type ExpenseData = Omit<Expense, 'date'>;
