import { Expense } from 'model/types';

export interface ExpenseInput extends Omit<Expense, 'date'> {
    date: string;
}
