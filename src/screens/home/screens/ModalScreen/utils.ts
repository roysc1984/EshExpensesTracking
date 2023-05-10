import { formatDate } from 'common/utils';
import { format, isValid, parse } from 'date-fns';
import { Expense } from 'model/types';

export const showAmount = (amount?: number) => {
    if (!amount) return '';
    const amountStr = `${amount}`;
    if (amountStr && amountStr.charAt(0) === '$') {
        return amountStr;
    } else if (amountStr) {
        return `$${amountStr}`;
    }
};

export const convertDate = (date: string) => {
    const newDate = date.split('.').join('/');
    const parsedDate = parse(newDate, 'P', new Date());
    if (isValid(parsedDate)) {
        return new Date(format(parsedDate, 'yyyy-MM-dd')).getTime();
    } else {
        return new Date().getTime();
    }
};

export const setStrDate = (expense: Expense) => {
    return { ...expense, date: formatDate(expense.date) };
};
