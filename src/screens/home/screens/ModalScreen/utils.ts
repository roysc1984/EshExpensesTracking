import { formatDate } from 'common/utils';
import { format, isValid, parse } from 'date-fns';
import { Expense, FilterExpenseData } from 'model/types';

export const showAmount = (amount?: string) => {
    if (amount && amount.charAt(0) === '$') {
        return amount;
    } else if (amount) {
        return `$${amount}`;
    }
};

export const parseDate = (date: string) => {
    const newDate = date?.split('.').join('/');
    return parse(newDate, 'P', new Date());
};
export const isValidDate = (date: string) => {
    const parsedDate = parseDate(date);
    return isValid(parsedDate);
};

export const convertDate = (date: string) => {
    const parsedDate = parseDate(date);
    if (isValid(parsedDate)) {
        return new Date(format(parsedDate, 'yyyy-MM-dd')).getTime();
    } else {
        return new Date(format(new Date(), 'yyyy-MM-dd')).getTime();
    }
};

export const convertMount = (amount?: string) =>
    amount ? parseFloat(amount) : 0;

export const setStrDate = (expense: Expense) => {
    return {
        ...expense,
        date: expense.date ? formatDate(expense.date) : '',
        amount: expense.amount ? `${expense.amount}` : '',
    };
};

export const setStrDateFilter = (expense: FilterExpenseData) => {
    return {
        ...expense,
        date: expense.date ? formatDate(expense.date) : '',
        id: 'filter',
    };
};

export const removeDollarChar = (value: string) =>
    value.charAt(0) === '$' ? value.slice(1) : value;
