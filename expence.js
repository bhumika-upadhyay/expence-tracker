const balance = document.getElementById("Balance");
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('Amount');

// last
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions:[];


// add transactions

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '')
        {
        alert('please enter  text and value'); }
    else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

// generate id 
function generateId() {
    return Math.floor(Math.random() * 100000000);
}

// add transactions to dom list

function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    //  add class based on value
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    // use literal
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    // item ko append krege
    list.appendChild(item);
}

// update  updateValues

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expence = (
        amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expence}`;
}
// remove transaction  by id 6

function removeTransaction(id) {
    transactions = transactions.filter(

        transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}

// last part
// update local storage

function updateLocalStorage() {
    localStorage.setItem(
        'transactions', JSON.stringify(transactions)
    );
}
// 3
// init app
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener('submit', addTransaction);