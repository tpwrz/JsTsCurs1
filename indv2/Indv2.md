# Запуск проекта 
1) Скачайте или клонируйте репозиторий на личный компьютер
2) Убедитесь, что на вашем копьютере установлен Node.js [link](https://nodejs.org/en)
3) Откройте консоль в папке indv1
4) Запустите консольное приложение командой 
```console
node index.js
```

# Описание индивидуальной работы
Цель: Ознакомиться студентов с продвинутыми функциями JavaScript, включая асинхронный JavaScript, модули и обработку ошибок.

## Условие

### Структура проекта

1. Создать файл `index.html` с основной структурой веб-страницы.
2. Создать файл `index.css` для определения стилей страницы.
3. Создать директорию `/src`, где будут размещены файлы JavaScript.
4. В директории `/src` создать файл `index.js` (или `main.js`) с основным кодом JavaScript.
5. В директории `/src` создать файл `activity.js`, в котором будет содержаться логика для получения данных со сторонних ресурсов.

### Получение данных с сервера

1. Написать функцию `getRandomActivity()`, которая будет делать запрос и получать данные со стороннего ресурса: https://bored-api.appbrewery.com/random.
2. Отобразить полученную активность (текст активности) на странице `index.html`.
3. Добавить обработку ошибок в функцию `getRandomActivity()`. В случае ошибки добавить следующий текст в файл `index.html`: "К сожалению, произошла ошибка".
4. Изменить функцию `getRandomActivity()` так, чтобы она использовала ключевые слова `async / await`.
5. Добавить функционал обновления данных каждую минуту. Используйте функцию `setTimeout()`.
6. **Дополнительное задание**: изменить функцию `getRandomActivity()` так, чтобы она возвращала данные, и добавить функцию `updateActivity()`, которая будет отображать полученные данные.

# Краткая документация к проекту
Данный проект показывает на странице результат запроса (написанного разными способами) к ресурсу https://bored-api.appbrewery.com/random.

`index.js`, который импортирует и вызывает определенную фукнцию из файла `activity.js`.
Функция `getRandomActivity()` изменяется несколько раз в процессе выполнения работы. Далее будут приведены шаги и модификации данной функции.

# Примеры использования проекта с приложением скриншотов или фрагментов кода
Контекст:
```js
*index.js*
// import getRandomActivity from another file
import { updateActivity } from "./activity.js";

// call the function
updateActivity()
```

1. Пример использования изначальной функции `getRandomActivity()`
```js
/**
 * Displays received data from url
 * Uses Promise fetch 
 */
export function getRandomActivity() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://bored-api.appbrewery.com/random';
    fetch(proxyUrl + apiUrl)
        .then(response => { return response.json() })
        .then(data => {
            document.getElementById("activity").innerHTML = data.activity;
        })
}
```
2. Пример использования функции `getRandomActivity()` c обработкой ошибок
```js
/**
 * Displays received data from url
 * Uses Promise fetch and in case of exception shows an Error Message
 */
export function getRandomActivity() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://bored-api.appbrewery.com/random';
    fetch(proxyUrl + apiUrl)
        .then(response => { return response.json() })
        .then(data => {
            document.getElementById("activity").innerHTML = data.activity;
        })
        // added error handling
        .catch(error => {
            console.error("Error in Promise fetch: " + error)
            document.getElementById("activity").innerHTML = "К сожалению, произошла ошибка";
        })
}
```

3. Пример использования функции `getRandomActivity()` c обработкой ошибок но с `await/async`
```js
/**
 * Displays received data from url
 * Uses async/await fetch and in case of exception shows an Error Message
 */
export async function getRandomActivity() {
    console.log("one");
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://bored-api.appbrewery.com/random';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        document.getElementById("activity").innerHTML = data.activity;
    }
    catch (error) {
        console.error("Error in await fetch: " + error)
        document.getElementById("activity").innerHTML = "К сожалению, произошла ошибка";
    };
}
```

4. Пример использования функции `getRandomActivity()` c обработкой ошибок но с `await/async` и постоянным обновлением
```js
/**
 * Displays received data from url
 * Uses async/await fetch and in case of exception shows an Error Message
 */
export async function getRandomActivity() {
    console.log("one");
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://bored-api.appbrewery.com/random';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        document.getElementById("activity").innerHTML = data.activity;
    }
    catch (error) {
        console.error("Error in await fetch: " + error)
        document.getElementById("activity").innerHTML = "К сожалению, произошла ошибка";
    };
    // added automatic reload of data every 60 seconds
    setTimeout(getRandomActivity, 6000);
}
```
5. Пример использования функции `getRandomActivity()` c обработкой ошибок но с `await/async` и постоянным обновлением и вызовом из функции `updateActivity()`
```js
/**
 * Receives and transmits data from url to another method
 * Uses async/await fetch and in case of exception returs an Error Message
 * @returns string representing either data or error message
 */
async function getRandomActivity() {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://bored-api.appbrewery.com/random';
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        return data.activity;
    }
    catch (error) {
        console.error("Error in await fetch: " + error)
        return "К сожалению, произошла ошибка";
    };
}

/**
 * Displays information in HTML page.
 */
export async function updateActivity() {
    const data = await getRandomActivity();
    document.getElementById("activity").innerHTML = data;
    setTimeout(updateActivity, 6000);
}
```
*Вывод об ошибке*
![error message](image.png)

# Ответы на контрольные вопросы
1. _Какое значение возвращает функция fetch?_

    Функция fetch возвращает объект Promise.

2. _Что представляет собой Promise?_

    Promise  - это объект-обертка, представляет собой результат выполнения асинхронной функции.

3. _Какие методы доступны у объекта Promise?_

    `resolve()` , `reject()`, `.then()`, `.catch()`, `.finally()`

4. _Каковы основные различия между использованием async / await и Promise?_

    **Promise** - абстракция, представляющая собой обещание выполнения определенного действия, которое может завершиться успешно или с ошибкой. В Promise используется вложенность, последовательность разрешения асинхронных функций осуществляется через цепочку `.then()`.
    **async / await** - с их помощью можно последовательно выполнять асинхронные операции. Эту структуру можно использовать в try-catch, что облегчает читаемость кода. Для использования `await` необходимо определить функцию, в которой используется `await` как `async`. С `Promise` такого делать не надо.

# Список использованных источников
* [temporar access to api](https://cors-anywhere.herokuapp.com/corsdemo)
* [working ling to bored api](https://bored-api.appbrewery.com)
* [how to use modules](https://github.com/MSU-Courses/javascript_typescript/blob/main/docs/07_modules/73_export_import.md)
