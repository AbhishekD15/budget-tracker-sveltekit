// src/lib/types.ts

/**
 * Represents an income entry for one person.
 */
export interface Income {
    name: string;
    amount: number;
  }
  
  /**
   * Represents an expense entry.
   * - `planned` is the initial estimated amount.
   * - `actual` is optional and can be filled in later for verification.
   * - `selected` determines whether this expense should be included in savings calculations.
   */
  export interface Expense {
    category: string;
    planned: number;
    actual?: number;
    selected?: boolean;
  }
  
  /**
   * The overall budget data structure.
   */
  export interface BudgetData {
    incomes: Income[];
    expenses: Expense[];
  }
  