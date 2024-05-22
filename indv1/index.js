/**
 * Describes one transaction
 */
class Transaction {
    /**
     * Creates one transaction
     * @param {string} id - transaction ID
     * @param {string|Date} date - date on which transaction was executed
     * @param {number} amount - the amount of money transfered
     * @param {string} type - transaction type (ex. "debit", "credit")
     * @param {string} description - description of the transaction
     * @param {string} name - merchant name (of the store or the company)
     * @param {string} card_type - card type (ex: "visa", "mastercard")
     */
    constructor(id, date, amount, type, description, name, card_type) {
        /** @type {string} */
        this.transaction_id = id;
        /** @type {Date} */
        this.transaction_date = new Date(date);
        /** @type {number} */
        this.transaction_amount = amount;
        /** @type {string} */
        this.transaction_type = type;
        /** @type {string} */
        this.transaction_description = description;
        /** @type {string} */
        this.merchant_name = name;
        /** @type {string} */
        this.card_type = card_type;
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
 * Analyses the transaction(s) using methods
 */
class TransactionAnalyzer {
    /**
     * Creates one instance of TransactionAnalyzer type
     * @param {Transaction[]} transactions - array of transactions
     */
    constructor(transactions = []) {
        this.transactions = transactions;
    }
    /**
     * Adds new transaction to the end of the transactions' array
     * @param {Transaction} transaction -one transaction instance
     * @returns new length of the array
     */
    addTransaction(transaction) {
        return this.transactions.push(transaction);
    }
    /**
     * Method to get all transactions stored in the instance
     * @returns Transaction type array 
     */
    getAllTransactions() {
        return this.transactions;
    }
    /**
     * Returns set of unique transaction types from all of the transactions stored in the instance
     * @returns set of unique strings
     */
    getUniqueTransactionType() {
        const types = new Set(this.transactions.map(tx => tx.transaction_type));
        return types;
    }
    /**
     * Method to calculate the sum of all transfered amounts from all transactions stored in the instance
     * Uses .reduce method to add the transaction_amount one by one into the resulting(accumulating) variable
     * @returns number representing sum of the trasnfered amounts
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, tx) => total + tx.transaction_amount, 0);
    }
    /**
     * Calculates the sum of all transfered amounts at specific date (represented in arguments as 3 numbers: YYYY - MM -DD)
     * Uses .filter method to get transactions that occured at set date 
     * (checks if provided year,month and day match the transaction's year, month and day)
     * Uses .reduce method to then add the transaction_amount from selected transactions one by one into the resulting variable
     * @param {number} year - specific year
     * @param {number} month -specific month
     * @param {number} day - specific day
     * @returns  number representing sum of the trasnfered amounts in specific date
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.filter(tx => {
            const txDate = new Date(tx.transaction_date);
            const matchesYear = year ? txDate.getFullYear() === year : true;
            const matchesMonth = month ? txDate.getMonth() + 1 === month : true;
            const matchesDay = day ? txDate.getDate() === day : true;
            return matchesYear && matchesMonth && matchesDay;
        }).reduce((total, tx) => total + tx.transaction_amount, 0);
    }
    /**
     * Used to see transactions only of specific type
     * Uses .filter method to select the transactions by comparing transaction_type to provided string
     * @param {string} type - transaction type name in string format
     * @returns an array of transactions of provided type
     */
    getTransactionByType(type) {
        return this.transactions.filter(tx => tx.transaction_type === type);
    }
    /**
     * Is used to see the transactions in certain period of time
     * Uses .filter method to select transactions that are executed later or in the same day than starting date
     * yet are executed earlier or in the same day than ending date
     * @param {string} startDate - starting date to search in string format "YYYY-MM-DD"
     * @param {string} endDate  - ending date to search in string format "YYYY-MM-DD"
     * @returns array of transactions
     */
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(tx => new Date(tx.transaction_date) >= start && new Date(tx.transaction_date) <= end);
    }
    /**
     * Used to see all transactions made by or towards that merchant
     * Uses .filter method to select transactions that have only that merchant name in their data
     * @param {string} merchantName - string reperesenting a Store or Company or Merchant name
     * @returns array of transaction made to or by that merchant
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(tx => tx.merchant_name === merchantName);
    }
    /**
     * Method calculates the average of all transactions amount that were made
     * Uses another method to reuse the code
     * @returns number representing average transaction sum
     */
    calculateAverageTransactionAmount() {
        if (this.transactions.length === 0) return 0;
        return this.calculateTotalAmount() / this.transactions.length;
    }
    /**
     * Returns only transactions, transfered amount of which are in the specified number(money) range
     * @param {number} minAmount - minimum amount in the transaction as number
     * @param {*} maxAmount - maximum amount in the transaction as number
     * @returns array of transactions
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(tx => tx.transaction_amount >= minAmount && tx.transaction_amount <= maxAmount);
    }
    /**
     * Uses .reduce method to get the sum of only debit card transactions (which are returned by another method)
     * @returns number representing sum of transfered money on debit cards
     */
    calculateTotalDebitAmount() {
        return this.getTransactionByType('debit').reduce((total, tx) => total + tx.transaction_amount, 0);
    }
    /**
     * Calculates the month in which most number of transactions was made
     * Uses .reduce method to get an array where at each of 12 indexs is a sum of transactions found
     * Object.keys gets indexes of the array to calculate the max value
     * @returns string representing a month
     */
    findMostTransactionsMonth() {
        const monthCounts = this.transactions.reduce((counts, tx) => {
            const month = new Date(tx.transaction_date).getMonth() + 1;
            counts[month] = (counts[month] || 0) + 1; // checks if such month already exists
            return counts;
        },{});
       return monthDict[Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b)];
    }
    /**
     * Calculates the month in which most number of transactions was made on debit cards
     * Uses .reduce method to get an array where at each of 12 indexs is a sum of transactions found
     * @returns string representing a month
     */
    findMostDebitTransactionMonth() {
        const debitTransactions = this.getTransactionByType('debit');
        const monthCounts = debitTransactions.reduce((counts, tx) => {
            const month = new Date(tx.transaction_date).getMonth() + 1;
            counts[month] = (counts[month] || 0) + 1;
            return counts;
        }, {});
        return monthDict[Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b)];
    }
    /**
     * Calculates the most used card type by comparing the number transactions made by each of card types
     * @returns string representing card type
     */
    mostTransactionTypes() {
        const debitCount = this.getTransactionByType('debit').length;
        const creditCount = this.getTransactionByType('credit').length;
        if (debitCount > creditCount) return 'debit';
        if (creditCount > debitCount) return 'credit';
        return 'equal';
    }

    /**
     * Filters the transactions that were executed before the set date
     * @param {string} date - string representation of date YYYY-MM-DD 
     * @returns array of transactions made before provided date
     */
    getTransactionsBeforeDate(date) {
        const comparisonDate = new Date(date);
        return this.transactions.filter(tx => new Date(tx.transaction_date) < comparisonDate);
    }
    /**
     * Finds the transaction by provided Id
     * @param {number} id - number representing Id of transaction 
     * @returns  a transaction 
     */
    findTransactionById(id) {
        return this.transactions.find(tx => tx.transaction_id === id);
    }
    /**
     * Create a new array that contains only the descriptions of all transactions, saving the order of transactions from original array
     * @returns array of string representing transactions descriptions
     */
    mapTransactionDescriptions() {
        return this.transactions.map(tx => tx.transaction_description);
    }
}

// creating a dictionary that will contain months and their indexes (by js logic)
const monthDict = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 10: "November", 11: "December" }
// getting the transactions from .json file
const transactions_json = require("../indv1/transactions.json");
// creating a TransactionAnalyzer instance and transmiting all of the transactions from json into that instance using constructor
const transactionAnalyzer = new TransactionAnalyzer(transactions_json);

// creating a new custom Transaction to showcase all of the methods created
const new_transaction = new Transaction("999", new Date(), 9999, "new_type", "there is a long long long long description", "Merchant_111", "Visa");
// Adding a new transaction to transactionAnalyzer instance
console.log("\t\t\tadd new Transaction");
console.log(transactionAnalyzer.addTransaction(new_transaction));

// Showcase and usage example of all transactionsAnalyzer methods
console.log("\t\t\tshow new Transaction");
console.log(new_transaction.string())
console.log("\t\t\tshow all transactions");
console.log(transactionAnalyzer.getAllTransactions());
console.log("\t\t\tshow unque type transactions");
console.log(transactionAnalyzer.getUniqueTransactionType());
console.log("\t\t\tshow total amount of transactions");
console.log(transactionAnalyzer.calculateTotalAmount());
console.log("\t\t\tshow total amount of transactions by specific date *2019-01-13*");
console.log(transactionAnalyzer.calculateTotalAmountByDate(2019, 1, 13));
console.log("\t\t\tshow transactions by type *debit*");
console.log(transactionAnalyzer.getTransactionByType("debit"));
console.log("\t\t\tshow all transactions in date range *2019-01-13 - 2019-01-15*");
console.log(transactionAnalyzer.getTransactionsInDateRange("2019-01-13", "2019-01-15"));
console.log("\t\t\tshow transactions by merchant *Cafe789*");
console.log(transactionAnalyzer.getTransactionsByMerchant("Cafe789"));
console.log("\t\t\tshow average amount of transactions");
console.log(transactionAnalyzer.calculateAverageTransactionAmount());
console.log("\t\t\tshow transactions by amount range *0-20*");
console.log(transactionAnalyzer.getTransactionsByAmountRange(0, 20));
console.log("\t\t\tshow amount of debit transactions");
console.log(transactionAnalyzer.calculateTotalDebitAmount());
console.log("\t\t\tshow month with most transactions");
console.log(transactionAnalyzer.findMostTransactionsMonth());
console.log("\t\t\tshow month with most debit transactions");
console.log(transactionAnalyzer.findMostDebitTransactionMonth());
console.log("\t\t\tshow type with most transactions");
console.log(transactionAnalyzer.mostTransactionTypes());
console.log("\t\t\tshow all transactions before date *2019-02-10*");
console.log(transactionAnalyzer.getTransactionsBeforeDate("2019-02-10"));
console.log("\t\t\tshow transaction by ID *58*");
console.log(transactionAnalyzer.findTransactionById("58"));
console.log("\t\t\tshow only transactions descriptions");
console.log(transactionAnalyzer.mapTransactionDescriptions());


