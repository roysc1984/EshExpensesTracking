import { format } from 'date-fns';
import 'react-native';
import { parseDate } from 'screens/home/screens/modalsScreen/utils';
import { orderedExpensesSectionData } from 'screens/home/screens/homeScreen/components/utils';

describe('test create section data from expenses', () => {
    it('test convert data', () => {
        const data = orderedExpensesSectionData([
            { id: 'a', date: 12345, title: 'a', amount: 1 },
            { id: 'b', date: 12345, title: 'b', amount: 2 },
        ]);
        expect(data).toStrictEqual([
            {
                date: 12345,
                data: [
                    {
                        id: 'a',
                        title: 'a',
                        amount: 1,
                        date: 12345,
                    },
                    {
                        id: 'b',
                        title: 'b',
                        amount: 2,
                        date: 12345,
                    },
                ],
            },
        ]);
    });
});

describe('test parse date string', () => {
    it('test parse date', () => {
        const parsed = parseDate('02.02.2023');
        const date = format(parsed, 'yyyy-MM-dd');
        expect(date).toBe('2023-02-02');
    });
});
