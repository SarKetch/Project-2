document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    let selectedMood = null;
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("id") === "submit-btn") {
                displayRecipesForMood(selectedMood);
            } else if (this.classList.contains("round-button")) {
                selectedMood = this.getAttribute("data-type");
                selectMood(this);
            } else if (this.getAttribute("id") === "refresh-btn") {
                location.reload();
            }
        });
    }
});
function selectMood(button) {
    let buttons = document.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.classList.remove('selected');
    }
    button.classList.add('selected');
}
function displayRecipesForMood(mood) {
    let recipes;
    switch (mood) {
        case 'slowcooker':
            recipes = displaySlowCooker();
            break;
        case 'vegetarian':
            recipes = displayVeg();
            break;
        case 'quick':
            recipes = displayQuick();
            break;
        case 'suprise':
            recipes = displaySuprise();
            break;
    }
    if (recipes && recipes.length > 0) {
        let container = document.getElementById("recipes");
        container.innerHTML = '';
        let selected_recipes = getRandomRecipes(recipes, 3);

        for (let recipe of selected_recipes) {
            let link = document.createElement('a');
            link.href = recipe.url;
            link.textContent = recipe.title;

            let img = document.createElement('img');
            img.src = recipe.image; // new line
            img.classList.add('recipe-img')
            link.appendChild(img);  // new line

            container.appendChild(link);
        }
    }
}
function getRandomRecipes(recipes, num) {
    let result = new Array(num),
        len = recipes.length,
        taken = new Array(len);
    if (num > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (num--) {
        let x = Math.floor(Math.random() * len);
        result[num] = recipes[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
function displaySlowCooker() {
    return getRecipes('slowcooker');
}
function displayVeg() {
    return getRecipes('vegetarian');
}
function displayQuick() {
    return getRecipes('quick');
}
function displaySuprise() {
    let allrecipes = [];
    allrecipes = allrecipes.concat(getRecipes('slowcooker'));
    allrecipes = allrecipes.concat(getRecipes('vegetarian'));
    allrecipes = allrecipes.concat(getRecipes('quick'));
    return allrecipes;
}
function getRecipes(mood) {
    // Add or modify moods if you want
    let recipes = {
        'slowcooker': [
            { title: 'White Pork Ragu', url: 'https://www.theburntbuttertable.com/white-pork-ragu/', image:'assets/images/whiteragu1-1638x2048.jpeg', },
            { title: 'Osso Bucco', url: 'https://www.taste.com.au/recipes/osso-buco-6/1d8wtvyj?r=recipes/top100bestslowcookerrecipes&c=6ys6itzo/Top%20100%20best%20slow%20cooker%20recipes'},
            { title: 'Lemon Artichoke Chicken', url: 'https://fitslowcookerqueen.com/slow-cooker-chicken-artichokes-whole30-paleo/'},
            { title: 'Asian Braised Beef', url: 'https://www.thelittleepicurean.com/slow-cooker-asian-braised-beef/?utm_campaign=shareaholic&utm_medium=facebook&utm_source=socialnetwork'},
            { title: 'Welsh Lamb Hotpot', url:'https://www.supergoldenbakes.com/lamb-hotpot/'},
            { title: 'Chicken Curry', url: 'https://www.supergoldenbakes.com/slow-cooker-chicken-curry/'},
        ],
        'vegetarian': [
            { title: 'Simple Mushroom Curry', url: 'https://www.bbcgoodfood.com/recipes/simple-mushroom-curry' },
            // Add more vegetarian recipes
        ],
        'quick': [
            { title: 'Quick recipe 1', url: 'https://www.example.com' },
            // Add more quick recipes
        ]
    };
    return recipes[mood];
}