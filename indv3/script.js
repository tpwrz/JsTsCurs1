// Array contains all transactions
let transactions = [];
/**
 * Describes one transaction
 */
class Transaction {
    /**
     * Creates one transaction
     * @param {string} id - transaction ID
     * @param {string|Date} date - date on which transaction was executed
     * @param {number} amount - the amount of money transfered
     * @param {string} category - transaction category
     * @param {string} description - description of the transaction
     */
    constructor(id, date, amount, category, description) {
        /** @type {string} */
        this.id = id;
        /** @type {Date} */
        this.date = new Date(date);
        /** @type {number} */
        this.amount = amount;
        /** @type {string} */
        this.category = category;
        /** @type {string} */
        this.description = description;
    }
    /**
    * Modifies the instance into JSON instance
    * @returns {string} string of the JSON instance
    */
    string() {
        return JSON.stringify(this);
    }
}

/**
 * Add functionality to prevent reloading the page on submiting the form
 */
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addTransaction();
});

/**
 * Creates a transaction by getiing all of the entries of the form and saving them into the Trasaction object, 
 * then appends the instance to the array
 * Also calls the fuction to create HTML elements to show the new information on page
 * @returns resets the form to empty inputs
 */
function addTransaction() {
    const formData = new FormData(document.getElementById("transactionForm"));
    const transaction = new Transaction();
    transaction.id = getRandomInt(0, 200)
    for (let [key, value] of formData.entries()) {
        if(value.trim() === '')  return;
        transaction[key] = value;
    }
    transactions.push(transaction);
    createNewRow(transaction);
    document.getElementById('transactionForm').reset();
}

/**
 * Creates HTML elements to show new information, also add some functionality to the new table row
 * Updates total sum of transactioned money
 * @param {Transaction} transaction  - transaction instance created by addTransaction()
 */
function createNewRow(transaction) {
    var table = document.getElementById("transactions");
    var row = table.insertRow(-1);
    row.insertCell(0).innerHTML = transaction.id;
    row.insertCell(1).innerHTML = transaction.date;
    row.insertCell(2).innerHTML = transaction.amount;
    row.insertCell(3).innerHTML = transaction.category;
    var descCell = row.insertCell(4);
    var deleteCell = row.insertCell(5)
    descCell.innerHTML = transaction.description.split(" ").slice(0, 4).join(" ");
    deleteCell.innerHTML = "<button type=button onclick='deleteTransaction("+transaction.id+")'>Delete</button>"
    parseInt(transaction["amount"]) > 0 ? row.classList+="positive" : row.classList+="negative";
    row.onclick = function(){
        row.classList.toggle("show");
        row.classList.contains("show")?  descCell.innerHTML = transaction.description  : descCell.innerHTML = transaction.description.split(" ").slice(0, 4).join(" ");
    }
    calculateTotal();
}

/**
 * Deletes transaction by id, and updates transactions array to represent the change
 * Also deletes row of the transaction on the page, to represent the change. 
 * Updates total sum of transactioned money
 * @param {number} deleteId - id of the transaction to delete
 */
function deleteTransaction(deleteId){
    transactions = transactions.filter(tr=>tr.id != deleteId)
    const parentDiv =  document.getElementById("transactions").children[0];
    for(var i=0; i< parentDiv.children.length;i++){
        if(parentDiv.children[i].children[0].innerHTML == deleteId)
            document.getElementById("transactions").deleteRow(i);
    }
    calculateTotal();
}

/**
 * Calculates the sum of the money transfered
 * Shows it on page in designated place
 */
function calculateTotal(){
    const result = transactions.reduce((result, tr) => result + parseInt(tr["amount"]) , 0)
    document.getElementById("total").innerHTML = "Total = "+ result.toFixed(2) + " MDL";
}

/**
 * Creates a random number to represent unique Id of the transaction
 * @param {number} min - minimum number to return randomly
 * @param {number} max - minimum number to return randomly
 * @returns random number 
 */
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


