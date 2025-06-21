const balance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  list.innerHTML = "";
  let total = 0, inc = 0, exp = 0;

  transactions.forEach(({ id, text, amount }) => {
    const li = document.createElement("li");
    li.className = amount < 0 ? "minus" : "plus";
    li.innerHTML = `
      ${text} <span>${amount < 0 ? "-" : "+"}₹${Math.abs(amount)}</span>
      <button class="delete-btn" data-id="${id}">x</button>
    `;
    list.appendChild(li);

    total += amount;
    amount < 0 ? exp += amount : inc += amount;
  });

  balance.innerText = `₹${total.toFixed(2)}`;
  income.innerText = `₹${inc.toFixed(2)}`;
  expense.innerText = `₹${Math.abs(exp).toFixed(2)}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") return;

  transactions.push({
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  });

  text.value = "";
  amount.value = "";
  updateUI();
});

list.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    transactions = transactions.filter(t => t.id != e.target.dataset.id);
    updateUI();
  }
});

updateUI();


