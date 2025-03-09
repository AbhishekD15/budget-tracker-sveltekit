# Budget Tracker Web App with SvelteKit

A minimal, single-page budget tracker web app built with SvelteKit. This app allows you and your partner to input monthly incomes and planned expenses, verify them at the end of the month, and export your data as JSON or CSV.

## Features

- **Budget Input:**  
    Enter incomes and a dynamic list of planned expenses. Easily add or remove expense entries.
    
- **Budget Summary:**  
    View a summary of total income, total expenses, and calculate potential savings. Update actual expenses to compare planned vs. actual spending.

- **Export Functionality:**  
    Export your budget data as JSON or CSV using a unified data schema for easy sharing and analysis.

## Project Structure

- `src/components/`  
    Contains Svelte components such as `BudgetInput.svelte` and `BudgetSummary.svelte`.

- `src/lib/`  
    - `stores.ts` – Svelte store managing the global budget data.
    - `types.ts` – TypeScript interfaces for the project data model.
    - `export.ts` – Utility functions for exporting budget data as JSON or CSV.

- `src/routes/+page.svelte`  
    Main entry point that renders the Budget Input and Budget Summary components.

## Getting Started

1. **Clone the repository:**

     ```bash
     git clone https://github.com/yourusername/budget-tracker-sveltekit.git
     cd budget-tracker-sveltekit
     ```

2. **Install dependencies:**

     ```bash
     npm install
     ```

3. **Run the development server:**

     ```bash
     npm run dev
     ```

4. **Open the app in your browser:**
     Navigate to `http://localhost:5173/` to see the app in action.

## Deployment

This app can be easily deployed on Vercel.

1. **Install Vercel CLI:**

     ```bash
     npm install -g vercel
     ```

2. **Deploy the app:**

     ```bash
     vercel
     ```

3. **Follow the prompts:**
     Vercel CLI will guide you through the deployment process. Once completed, you will get a deployment URL.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## Contact

For any questions or feedback, please reach out to [Abhishek Das](mailto:das.abhishek15@gmail.com).
