// src/lib/export.ts
import type { BudgetData } from './types';

/**
 * A unified structure for each record in the export array.
 */
interface UnifiedRecord {
  type: 'Income' | 'Expense';
  name: string | null;
  amount: number | null;
  category: string | null;
  planned: number | null;
  actual: number | null;
  selected: boolean | null;
}

/**
 * Convert the store's data into a single array of typed records.
 */
function createUnifiedData(data: BudgetData): UnifiedRecord[] {
  const result: UnifiedRecord[] = [];

  // Transform incomes
  data.incomes.forEach(income => {
    result.push({
      type: 'Income',
      name: income.name,
      amount: income.amount,
      category: null,
      planned: null,
      actual: null,
      selected: null
    });
  });

  // Transform expenses
  data.expenses.forEach(expense => {
    result.push({
      type: 'Expense',
      name: null,
      amount: null,
      category: expense.category,
      planned: expense.planned,
      actual: expense.actual ?? null,
      selected: expense.selected ?? null
    });
  });

  return result;
}

/**
 * Export as JSON using the unified schema.
 */
export function exportJSON(data: BudgetData): void {
  const unifiedData = createUnifiedData(data);
  const jsonStr = JSON.stringify(unifiedData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, 'budget_report.json');
}

/**
 * Export as CSV using the unified schema.
 */
export function exportCSV(data: BudgetData): void {
  const unifiedData = createUnifiedData(data);

  // Create a header row
  let csvContent = 'type,name,amount,category,planned,actual,selected\r\n';

  // Fill rows
  unifiedData.forEach(record => {
    csvContent += [
      record.type,
      record.name ?? '',
      record.amount ?? '',
      record.category ?? '',
      record.planned ?? '',
      record.actual ?? '',
      record.selected ?? ''
    ].join(',') + '\r\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, 'budget_report.csv');
}

/**
 * Trigger file download in the browser.
 */
function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
