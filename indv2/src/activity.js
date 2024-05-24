/**
 * Receives and transmits data from url to another method
 * Uses async/await fetch and in case of exception returs an Error Message
 * @returns string representing either data or error message
 */
async function getRandomActivityAwaitReturn() {
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
    const data = await getRandomActivityAwaitReturn();
    document.getElementById("activity").innerHTML = data;
    setTimeout(updateActivity, 6000);
}