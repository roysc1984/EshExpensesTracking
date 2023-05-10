export const showAmount = (amount?: number) => {
    if (!amount) return '';
    const amountStr = `${amount}`;
    if (amountStr && amountStr.charAt(0) === '$') {
        return amountStr;
    } else if (amountStr) {
        return `$${amountStr}`;
    }
};
