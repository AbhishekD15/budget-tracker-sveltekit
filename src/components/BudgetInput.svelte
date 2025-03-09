<script lang="ts">
    import { budgetData } from '$lib/stores';
    import { get } from 'svelte/store';
    import type { BudgetData, Expense } from '$lib/types';
  
    // Reactive declarations to calculate totals/savings
    $: totalIncome = $budgetData.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    $: totalSelectedExpenses = $budgetData.expenses
      .filter((exp: Expense) => exp.selected)
      .reduce((sum, exp) => sum + exp.planned, 0);
    $: savings = totalIncome - totalSelectedExpenses;
  
    // Show/hide the savings result
    let showSavings = false;
    function toggleSavings() {
      showSavings = !showSavings;
    }
  
    // Store update helpers (typed for clarity)
    function updateIncome(index: number, value: number) {
      budgetData.update((current: BudgetData) => {
        current.incomes[index].amount = value;
        return current;
      });
    }
  
    function updateExpenseCategory(index: number, value: string) {
      budgetData.update((current: BudgetData) => {
        current.expenses[index].category = value;
        return current;
      });
    }
  
    function updateExpensePlanned(index: number, value: number) {
      budgetData.update((current: BudgetData) => {
        current.expenses[index].planned = value;
        return current;
      });
    }
  
    function updateExpenseSelected(index: number, value: boolean) {
      budgetData.update((current: BudgetData) => {
        current.expenses[index].selected = value;
        return current;
      });
    }
  
    function addExpense() {
      budgetData.update((current: BudgetData) => {
        current.expenses.push({ category: '', planned: 0, actual: 0, selected: true });
        return current;
      });
    }
  
    function toggleSelectAll(event: Event) {
      const checked = (event.target as HTMLInputElement).checked;
      budgetData.update((current: BudgetData) => {
        current.expenses = current.expenses.map(exp => ({ ...exp, selected: checked }));
        return current;
      });
    }
  
    function deleteExpense(index: number) {
      budgetData.update((current: BudgetData) => {
        current.expenses.splice(index, 1);
        return current;
      });
    }
  </script>
  
  <style>
    /* Global monospace font & background for demonstration */
    :global(html),
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: 'Roboto Mono', Menlo, Monaco, Consolas, 'Courier New', monospace;
      background-color: #f2f2f2;
    }
  
    .container {
      max-width: 650px;
      margin: 3rem auto;
      padding: 3rem; /* Increased padding for more spacing */
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: bold;
      color: #333;
      text-align: center; /* Center-aligned heading */
    }
  
    p {
      margin-bottom: 1.5rem;
      color: #555;
      line-height: 1.6;
    }
  
    /* Section headings */
    .section {
      margin-bottom: 1.5rem;
    }
  
    .section h2 {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
      color: #222;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.25rem;
    }
  
    /* Income/expense items */
    .income-item,
    .expense-item {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  
    /* Labels & inputs */
    label {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      line-height: 1.4;
    }
  
    input[type="text"],
    input[type="number"] {
      padding: 0.4rem 0.6rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease;
    }
  
    input[type="text"]:focus,
    input[type="number"]:focus {
      border-color: #999;
    }
  
    input[type="checkbox"] {
      transform: scale(1.1);
      cursor: pointer;
    }
  
    /* Buttons */
    button {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: background-color 0.2s ease;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    .delete-button {
      background-color: #dc3545;
      margin-left: auto; /* push it to the right if you want it separate */
    }
  
    .delete-button:hover {
      background-color: #c82333;
    }
  
    .calculate-button {
      margin-top: 1rem;
      background-color: #28a745;
    }
  
    .calculate-button:hover {
      background-color: #218838;
    }
  
    .savings-display {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #e9f8ee;
      border-radius: 4px;
    }
  
    .savings-display p {
      margin: 0.4rem 0;
      font-weight: 500;
    }
  </style>
  
  <div class="container">
    <h1>Monthly Budget Input</h1>
    <p>Enter your incomes and planned expenses for the month. Select which expenses apply, then calculate your potential savings.</p>
  
    <!-- Income Section -->
    <div class="section">
      <h2>Incomes</h2>
      {#each $budgetData.incomes as income, i}
        <div class="income-item">
          <label>
            {income.name} Income:
            <input
              type="number"
              min="0"
              value={income.amount}
              on:input={(e) => updateIncome(i, +e.currentTarget.value)}
            />
          </label>
        </div>
      {/each}
    </div>
  
    <!-- Expense Section -->
    <div class="section">
      <h2>Planned Expenses</h2>
      <!-- Master "Select All" Checkbox -->
      <div style="margin-bottom: 0.75rem;">
        <label>
          <input
            type="checkbox"
            on:change={toggleSelectAll}
            checked={$budgetData.expenses.every((exp: Expense) => exp.selected)}
          />
          Select All Expenses
        </label>
      </div>
      <!-- Dynamic List of Expense Items -->
      {#each $budgetData.expenses as expense, index (index)}
        <div class="expense-item">
          <input
            type="checkbox"
            checked={expense.selected}
            on:change={(e) => updateExpenseSelected(index, e.currentTarget.checked)}
          />
          <label>
            Category:
            <input
              type="text"
              placeholder="e.g. Rent"
              value={expense.category}
              on:input={(e) => updateExpenseCategory(index, e.currentTarget.value)}
            />
          </label>
          <label>
            Planned Amount:
            <input
              type="number"
              min="0"
              value={expense.planned}
              on:input={(e) => updateExpensePlanned(index, +e.currentTarget.value)}
            />
          </label>
          <button class="delete-button" on:click={() => deleteExpense(index)}>
            Delete
          </button>
        </div>
      {/each}
      <button on:click={addExpense}>+ Add Expense</button>
    </div>
  
    <!-- Calculate Savings Button -->
    <button class="calculate-button" on:click={toggleSavings}>
      {#if showSavings}
        Hide Savings
      {:else}
        Calculate Savings
      {/if}
    </button>
  
    <!-- Display Savings if toggled on -->
    {#if showSavings}
      <div class="savings-display">
        <p>Total Income: {totalIncome}</p>
        <p>Total Selected Expenses: {totalSelectedExpenses}</p>
        <p>Savings: {savings}</p>
      </div>
    {/if}
  </div>
  