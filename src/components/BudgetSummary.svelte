<script lang="ts">
  import { budgetData } from "$lib/stores";
  import type { BudgetData, Expense } from "$lib/types";

  // Import export utilities
  import { exportJSON, exportCSV } from "$lib/export";
  import { get } from "svelte/store";

  // Reactive declarations: recalc totals whenever $budgetData changes
  $: totalIncome = $budgetData.incomes.reduce(
    (sum, inc) => sum + inc.amount,
    0
  );
  $: totalPlannedExpenses = $budgetData.expenses
    .filter((exp: Expense) => exp.selected)
    .reduce((sum, exp) => sum + exp.planned, 0);
  $: totalActualExpenses = $budgetData.expenses
    .filter((exp: Expense) => exp.selected)
    .reduce(
      (sum, exp) =>
        sum +
        (exp.actual !== undefined && exp.actual > 0 ? exp.actual : exp.planned),
      0
    );
  $: savings = totalIncome - totalActualExpenses;

  // Helper to update the "actual" field for an expense
  function updateActual(index: number, value: number) {
    budgetData.update((current: BudgetData) => {
      current.expenses[index].actual = value;
      return current;
    });
  }

  // Export handlers
  function handleExportJSON() {
    exportJSON(get(budgetData));
  }

  function handleExportCSV() {
    exportCSV(get(budgetData));
  }
</script>

<div class="container">
  <h1>Budget Summary</h1>

  <div class="summary">
    <p>Total Income: <strong>{totalIncome}</strong></p>
    <p>
      Total Planned Expenses (Selected): <strong>{totalPlannedExpenses}</strong>
    </p>
    <p>
      Total Actual Expenses (Selected): <strong>{totalActualExpenses}</strong>
    </p>
    <p>Savings: <strong>{savings}</strong></p>
  </div>

  <div>
    <h2>Expense Details</h2>
    {#each $budgetData.expenses as expense, index (index)}
      {#if expense.selected}
        <div class="expense-row">
          <div class="expense-details">
            <span><strong>{expense.category}</strong></span>
            <span>Planned: {expense.planned}</span>
          </div>
          <div>
            <label for="actual-{index}">Actual:</label>
            <input
              id="actual-{index}"
              type="number"
              min="0"
              value={expense.actual !== undefined && expense.actual > 0
                ? expense.actual
                : expense.planned}
              on:input={(e) => updateActual(index, +e.currentTarget.value)}
            />
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <!-- Export Buttons -->
  <div class="export-buttons">
    <button on:click={handleExportJSON}>Export as JSON</button>
    <button on:click={handleExportCSV}>Export as CSV</button>
  </div>
</div>

<style>
  .container {
    max-width: 650px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: #333;
  }

  .summary {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
  }

  .summary p {
    margin: 0.5rem 0;
  }

  .expense-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
  }

  .expense-row:last-child {
    border-bottom: none;
  }

  .expense-details {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-right: 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }

  input[type="number"] {
    width: 80px;
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .export-buttons {
    text-align: center;
    margin-top: 1.5rem;
  }

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    font-size: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    /* Reduce container padding and margin for smaller screens */
    .container {
      padding: 1.5rem;
      margin: 1.5rem auto;
      max-width: 95%;
    }

    /* Scale down the main heading */
    h1 {
      font-size: 1.5rem;
      text-align: center;
    }

    /* Adjust summary text size */
    .summary {
      font-size: 1rem;
    }

    /* Stack expense rows vertically for better readability */
    .expense-row {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.75rem 0;
    }

    /* Make the actual input full width on mobile */
    input[type="number"] {
      width: 100%;
      margin-top: 0.5rem;
    }

    /* Adjust export buttons to stack vertically */
    .export-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .export-buttons button {
      width: 100%;
      margin: 0;
    }
  }
</style>
