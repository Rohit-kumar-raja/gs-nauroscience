import { Transaction } from '../types';

const TRANSACTIONS_KEY = 'gs_neuro_transactions';

export const transactionService = {
  getAll: (): Transaction[] => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  create: (tx: Transaction): void => {
    const transactions = transactionService.getAll();
    const updated = [tx, ...transactions];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  },

  getMonthlyTotal: (type: 'credit' | 'debit'): number => {
    const transactions = transactionService.getAll();
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return transactions
      .filter(tx => {
        const txDate = new Date(tx.date);
        return tx.type === type && txDate.getMonth() === month && txDate.getFullYear() === year;
      })
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }
};