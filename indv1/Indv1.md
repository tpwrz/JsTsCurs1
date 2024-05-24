# Запуск проекта 
1) Скачайте или клонируйте репозиторий на личный компьютер
2) Убедитесь, что на вашем копьютере установлен Node.js [link](https://nodejs.org/en)
3) Откройте консоль в папке indv1
4) Запустите консольное приложение командой 
```console
node index.js
```

# Описание индивидуальной работы
Цель: Ознакомиться с основными функциями и с синтаксисом JavaScript на основе консольного приложения для анализа транзакций.

Условие:
Создать консольное приложение для анализа транзакций.

## Структура проекта
1. Создаnm файл `transactions.json`, содержащий указанные транзакции
    1. Использjdfnm транзакции, указанные в прикрепленном к лабораторной работе
       файле [transaction.json](./files/transaction.json).
2. Создаnm файл `index.js` (или `main.js`) для размещения кода.

## Класс `TransactionAnalyzer`
1. Создаnm класс `TransactionAnalyzer` для обработки транзакций.
2. Класс должен иметь методы для анализа транзакций, описанные ниже.
3. Конструктор класса будет принимать все транзакции в качестве аргумента.
4. Добавьте методы для добавления новой транзакции и получения списка всех транзакций.
    1. `addTransaction()`
    2. `getAllTransaction()`

## Транзакция
1. Каждая транзакция должна быть представлена отдельным объектом, содержащим все необходимые данные.
2. В каждую транзакцию необходимо добавить метод string(), который будет возвращать строковое представление транзакции в
   формате JSON [_extra_].

## Анализ транзакций
1. Реализовать методы для обработки данных о транзакциях.
    1. Метод `getUniqueTransactionType()`.
        1. Возвращает массив всевозможных типов транзакций (например, ['debit', 'credit']).
        2. Использовать `Set()` для выполнения задания.
    2. Метод `calculateTotalAmount()`.
        1. Рассчитывает общую сумму всех транзакций.
    3. Метод `calculateTotalAmountByDate(year, month, day)`.
        1. Вычисляет общую сумму транзакций за указанный год, месяц и день.
        2. Параметры year, month и day являются необязательными.
        3. В случае отсутствия одного из параметров, метод производит расчет по остальным.
    4. Метод `getTransactionByType(type)`.
        1. Возвращает транзакции указанного типа (debit или credit).
    5. Метод `getTransactionsInDateRange(startDate, endDate)`
        1. Возвращает транзакции, проведенные в указанном диапазоне дат от `startDate` до `endDate`.
    6. Метод `getTransactionsByMerchant(merchantName)`.
        1. Возвращает транзакции, совершенные с указанным торговым местом или компанией.
    7. Метод `calculateAverageTransactionAmount()`.
        1. Возвращает среднее значение транзакций.
    8. Метод `getTransactionsByAmountRange(minAmount, maxAmount)`.
        1. Возвращает транзакции с суммой в заданном диапазоне от minAmount до maxAmount.
    9. Метод `calculateTotalDebitAmount()` (у которых тип `debit`).
        1. Вычисляет общую сумму дебетовых транзакций.
    10. Метод `findMostTransactionsMonth()`.
        1. Возвращает месяц, в котором было больше всего транзакций.
    11. Метод `findMostDebitTransactionMonth()`
        1. Возвращает месяц, в котором было больше дебетовых транзакций.
    12. Метод `mostTransactionTypes()`
        1. Возвращает каких транзакций больше всего.
        2. Возвращает `debit`, если дебетовых.
        3. Возвращает `credit`, если кредитовых.
        4. Возвращает `equal`, если количество равно.
    13. Метод `getTransactionsBeforeDate(date)`
        1. Возвращает транзакции, совершенные до указанной даты.
    14. Метод `findTransactionById(id)`.
        1. Возвращает транзакцию по ее уникальному идентификатору.
    15. Метод `mapTransactionDescriptions()`
        1. Возвращает новый массив, содержащий только описания транзакций.

# Краткая документация к проекту
Данный проект показывает в консоли результат операций над транзакциями, взятыми из файла ```transactions.json```
### Классы
1. Transaction
Этот класс описывает одну транзакцию
2. TransactionAnalyzer 
Этот класс анализирует массив транзакций, предоставляя различные методы для анализа данных.

Так же предоставленны примеры использования функционала

# Примеры использования проекта с приложением скриншотов или фрагментов кода

1. Пример создания нового экземпляра класса Transaction и его добавление в список экземпляра класса TransactionAnalyzer
```js
// creating a new custom Transaction to showcase all of the methods created
const new_transaction = new Transaction("999", new Date(), 9999, "new_type", "there is a long long long long description", "Merchant_111", "Visa");
// Adding a new transaction to transactionAnalyzer instance
console.log("\t\t\tadd new Transaction");
console.log(transactionAnalyzer.addTransaction(new_transaction));
```
2. Пример использования функции экземпляра класса TransactionAnalyzer
```js
console.log("\t\t\tshow transaction by ID *58*");
console.log(transactionAnalyzer.findTransactionById("58"));
```
![result in console](./imgs/image.png)

# Ответы на контрольные вопросы
1. Какие примитивные типы данных существуют в JavaScript?

    number, string, bigint, undefined, boolean, symbol.

2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?

    .filter() , .reduce() , .map() , .find() , .sort().
    Применение методов массивов значительно уменьшило количество кода и помогло не создавать большое количество переменных, циклов и структур **if** .

3. В чем состоит роль конструктора класса?

    Конструктор класса используется для создания новых объектов с определёнными свойствами и методами.

4. Каким образом вы можете создать новый экземпляр класса в JavaScript?

    С помощью ключевого слова `new`.
    ```javascript
    const class1 = new Class1(*optional args*);
    ```

# Список использованных источников
* [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
* [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)
