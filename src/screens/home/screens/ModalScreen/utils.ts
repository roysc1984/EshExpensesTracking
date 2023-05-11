import { formatDate } from 'common/utils';
import { format, isValid, parse } from 'date-fns';
import { Expense, FilterExpenseData } from 'model/types';

export const showAmount = (amount?: number) => {
    if (!amount) return '';
    const amountStr = `${amount}`;
    if (amountStr && amountStr.charAt(0) === '$') {
        return amountStr;
    } else if (amountStr) {
        return `$${amountStr}`;
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

export const setStrDate = (expense: Expense) => {
    return {
        ...expense,
        date: expense.date ? formatDate(expense.date) : '',
    };
};

export const setStrDateFilter = (expense: FilterExpenseData) => {
    return {
        ...expense,
        date: expense.date ? formatDate(expense.date) : '',
        id: 'filter',
    };
};
