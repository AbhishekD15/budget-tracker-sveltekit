// src/lib/stores.ts
import { writable } from 'svelte/store';
import type { BudgetData } from '$lib/types';

export const budgetData = writable<BudgetData>({
  incomes: [
    { name: 'Abhishek', amount: 0 },
    { name: 'Shrastra', amount: 0 }
  ],
  expenses: [
    { category: '', planned: 0, actual: 0, selected: true }
  ]
});
