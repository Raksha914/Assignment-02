const expenseform = document.getElementById("Expense-form");
const filter = document.getElementById("filter");
const expenselist = document.getElementById("expense-list");
const total = document.getElementById("total");
let expense = JSON.parse(localStorage.getItem("expenses")) || [];

expenseform.addEventListener("submit", (events) => {
  events.preventDefault();
  const description = document.getElementById("Description").value;
  const amount = document.getElementById("Amount").value;
  const category = document.getElementById("Category").value;
  addingExpense(description, amount, category);
  expenseform.reset();
});

function addingExpense(description, amount, category) {
  expense.push({
    description,
    amount: parseFloat(amount),
    category,
  });
  let categoryExists = false;
  for (let i = 0; i < filter.options.length; i++) {
    if (filter.options[i].value === category) {
      categoryExists = true;
      break;
    }
  }
  if (!categoryExists) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  }
  savingExpenses();
  displayExpenses();
}

function savingExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expense));
}

function displayExpenses() {
  expenselist.innerHTML = "";
  const selectedCategory = filter.value;
  expense
    .filter(
      (exp) => selectedCategory === "all" || exp.category === selectedCategory
    )
    .forEach((exp, index) => {
      const expenseitem = document.createElement("div");
      expenseitem.classList.add("expense-item");
      expenseitem.innerHTML = `
      ${exp.description} - $${exp.amount} (${exp.category})
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
      `;
      expenselist.appendChild(expenseitem);
    });

  updateTotal();
}

function updateTotal() {
  const totalvalue = expense.reduce((sum, exp) => sum + exp.amount, 0);
  total.textContent = `Total : $${totalvalue}`;
}

function editExpense(index) {
  const exp = expense[index];
  document.getElementById("Description").value = exp.description;
  document.getElementById("Amount").value = exp.amount;
  document.getElementById("Category").value = exp.category;
  deleteExpense(index);
}

function deleteExpense(index) {
  expense.splice(index, 1);
  savingExpenses();
  displayExpenses();
}

filter.addEventListener("change", displayExpenses);
document.addEventListener("DOMContentLoaded", displayExpenses);
