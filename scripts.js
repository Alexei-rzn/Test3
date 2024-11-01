// Массив с возможностями применения JavaScript
const features = [
    "Создание интерактивных веб-страниц.",
    "Работа с API и запросами к серверу (AJAX).",
    "Создание одностраничных приложений (SPA).",
    "Визуализация данных с помощью библиотек (например, D3.js).",
    "Сторонние библиотеки и фреймворки (например, React, Vue, Angular)."
];

// Selecting the ul element where features will be displayed
const featureList = document.getElementById("feature-list");

// Function to display features in the list
function displayFeatures() {
    features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature; // Setting the text content of the list item
        featureList.appendChild(li); // Appending the list item to the ul
    });
}

// Call the displayFeatures function
displayFeatures();
