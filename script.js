const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');
const showAllButton = document.getElementById('show-all');

let currentMeals = [];

// Trigger search when Enter is pressed
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
    }
});

showAllButton.addEventListener('click', () => {
    displayMeals(currentMeals, false);
    showAllButton.classList.add('hidden');
});

async function fetchMeals(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        currentMeals = data.meals || [];
        displayMeals(currentMeals, true);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

function displayMeals(meals, showLimited = true) {
    resultsContainer.innerHTML = '';
    const mealsToShow = showLimited ? meals.slice(0, 5) : meals;

    mealsToShow.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-body">
                <h3>${meal.strMeal}</h3>
                <p><strong>ID:</strong> ${meal.idMeal}</p>
                <p>${meal.strInstructions.slice(0, 100)}...</p>
            </div>
        `;

        resultsContainer.appendChild(card);
    });

    if (showLimited && meals.length > 5) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }
}
