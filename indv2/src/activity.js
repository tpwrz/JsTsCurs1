/**
 * Displays received data from url
 * Uses Promise fetch and in case of exception shows an Error Message
 */
function getRandomActivity() {
    fetch('https://www.boredapi.com/api/activity/')
        .then(response => { return response.json() })
        .then(data => {
            document.getElementById("activity").innerHTML = data.activity;
        })
        .catch(error => {
            console.error("Error in Promise fetch: " + error)
            document.getElementById("activity").innerHTML = "К сожалению, произошла ошибка";
        })
}

/**
 * Displays received data from url
 * Uses async/await fetch and in case of exception shows an Error Message
 */
export async function getRandomActivityAwait() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();
        document.getElementById("activity").innerHTML = data.activity;
    }
    catch (error) {
        console.error("Error in await fetch: " + error)
        document.getElementById("activity").innerHTML = "К сожалению, произошла ошибка";
    };
    // added automatic reload of data every 60 seconds
    setTimeout(getRandomActivityAwait, 600);
}

/**
 * Receives and transmits data from url to another method
 * Uses async/await fetch and in case of exception returs an Error Message
 * @returns string representing either data or error message
 */
async function getRandomActivityAwaitReturn() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
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
function updateActivity() {
    document.getElementById("activity").innerHTML = getRandomActivityAwaitReturn();
}