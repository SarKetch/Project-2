// When DOM content is fully loaded, this function will execute
document.addEventListener("DOMContentLoaded", function () {
    // Fetch all buttons on the page
    let buttons = document.getElementsByTagName("button");
    // Variable to hold the selected mood
    let selectedMood = null;
    // Iterate over buttons to attach event listeners
    for (let button of buttons) {
        button.addEventListener("click", function () {
            // If 'Submit' button is clicked, display recipes for the selected mood
            if (this.getAttribute("id") === "submit-btn") {
                displayRecipesForMood(selectedMood);
            } else if (this.classList.contains("round-button")) {
                // If any mood button is clicked, change the selected mood and style
                selectedMood = this.getAttribute("data-type");
                selectMood(this);
            } else if (this.getAttribute("id") === "refresh-btn") {
                // If 'Refresh' button is clicked, reload the page
                location.reload();
            }
        });
    }
    // Allow the Enter key to also submit the selected mood
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && selectedMood) {
            displayRecipesForMood(selectedMood);
        }
    });
});


// Function to highlight the selected mood button
function selectMood(button) {
    let buttons = document.getElementsByTagName("button");
    // Remove the 'selected' class from all buttons
    for (let btn of buttons) {
        // Add the 'selected' class to the clicked button
        btn.classList.remove('selected');
    }
    button.classList.add('selected');
}
// Function to display recipes corresponding to the selected mood
function displayRecipesForMood(mood) {
    let recipes;
    // Determine the function to call based on the mood
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
    // If recipes are found, create HTML elements to display them
    if (recipes && recipes.length > 0) {
        let container = document.getElementById("recipes");
        container.innerHTML = '';
        let selected_recipes = getRandomRecipes(recipes, 3);
        // Iterate over the randomly selected recipes and append them to DOM
        for (let recipe of selected_recipes) {
            let link = document.createElement('a');
            link.href = recipe.url;
            link.textContent = recipe.title;
            link.target = '_blank';

            let img = document.createElement('img');
            img.src = recipe.image;
            // Sets the alt text to the recipe's title
            img.alt = recipe.title;
            img.classList.add('recipe-img');
            link.appendChild(img);

            container.appendChild(link);
            // Make the refresh button visible
            document.getElementById("refresh-btn").style.display = "block";
            // Scroll into view for the recipes
            document.getElementById("recipes").scrollIntoView({ behavior: 'smooth' });
        }

    }
}
// Function to get a specified number of random recipes from an array
function getRandomRecipes(recipes, num) {
    let result = new Array(num),
        len = recipes.length,
        taken = new Array(len);
    // Throw an error if more elements are requested than are available
    if (num > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (num--) {
        let x = Math.floor(Math.random() * len);
        result[num] = recipes[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
// Functions to fetch recipes for each mood type
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
    // Return a combined array of all recipes for the 'Surprise Me!' mood
    let allrecipes = [];
    allrecipes = allrecipes.concat(getRecipes('slowcooker'));
    allrecipes = allrecipes.concat(getRecipes('vegetarian'));
    allrecipes = allrecipes.concat(getRecipes('quick'));
    return allrecipes;
}
// Function that returns recipes based on the mood
function getRecipes(mood) {
    // Object containing arrays of recipe data for each mood
    let recipes = {
        'slowcooker': [
            { title: 'White Pork Ragu', url: 'https://www.theburntbuttertable.com/white-pork-ragu/', image: 'assets/images/whiteragu.webp', },
            { title: 'Osso Bucco', url: 'https://www.bestrecipes.com.au/recipes/osso-buco-slow-cooker-recipe/bbvbzngh', image: 'assets/images/ossobucco.webp' },
            { title: 'Lemon Artichoke Chicken', url: 'https://fitslowcookerqueen.com/slow-cooker-chicken-artichokes-whole30-paleo/', image: 'assets/images/lemonartichokechicken.webp' },
            { title: 'Asian Braised Beef', url: 'https://www.thelittleepicurean.com/slow-cooker-asian-braised-beef/?utm_campaign=shareaholic&utm_medium=facebook&utm_source=socialnetwork', image: 'assets/images/asianbraisedbeef.webp' },
            { title: 'Welsh Lamb Hotpot', url: 'https://www.supergoldenbakes.com/lamb-hotpot/', image: 'assets/images/lambhotpot.webp' },
            { title: 'Chicken Curry', url: 'https://www.supergoldenbakes.com/slow-cooker-chicken-curry/', image: 'assets/images/chickencurry.webp' },
        ],
        'vegetarian': [
            { title: 'Vegan Thai Green Curry', url: 'https://www.olivemagazine.com/recipes/quick-and-easy/vegan-thai-green-curry/', image: 'assets/images/green_curry_01-d12b810.webp' },
            { title: 'Burnt Aubergine Veggie Chilli', url: 'https://www.bbcgoodfood.com/recipes/burnt-aubergine-veggie-chilli', image: 'assets/images/auberginechili.webp' },
            { title: 'Sticky Sesame Cauliflower', url: 'https://www.tashasartisanfoods.com/blog/sticky-sesame-cauliflower/', image: 'assets/images/stickysesamecauliflower.webp' },
            { title: 'Crispy Gochujang Korean Tofu', url: 'https://eatwithclarity.com/gochujang-korean-tofu/?ssp_iabi=1684055153711', image: 'assets/images/koreantofu.webp' },
            { title: 'Mushroom Risotto with Leeks', url: 'https://www.feastingathome.com/mushroom-risotto/', image: 'assets/images/Mushroom-Risotto_.webp' },
            { title: 'Crispy Black Bean Tacos', url: 'https://playswellwithbutter.com/crispy-black-bean-tacos/', image: 'assets/images/blackbeantacos.webp' },

        ],
        'quick': [
            { title: 'Honey Garlic Chicken', url: 'https://www.kitchensanctuary.com/honey-garlic-chicken/', image: 'assets/images/honeygarlicchicken.webp' },
            { title: '20 Min Thai Basil Beef Rolls.', url: 'https://www.halfbakedharvest.com/beef-rolls/?adt_ei', image: 'assets/images/thaibeefrolls.webp' },
            { title: '10 Min Peanut Sauce Noodles', url: 'https://thetwincookingproject.net/10-minute-peanut-sauce-rice-noodles/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=1047384384_49051868_81643', image: 'assets/images/peanutnoodles.jpg.webp' },
            { title: 'Steak Tips and Mushrooms', url: 'https://www.thekitchn.com/recipe-easy-balsamic-glazed-steak-tips-and-mushrooms-249798', image: 'assets/images/beeftipswithmushrooms.webp' },
            { title: 'Ground Pork & Zucchini Stir-Fry', url: 'https://www.thekitchn.com/spicy-ground-pork-amp-zucchini-stir-fry-247254', image: 'assets/images/porkandcourgette.webp' },
            { title: 'Sheet Pan Chicken Fajitas', url: 'https://damndelicious.net/2019/07/24/sheet-pan-chicken-fajitas/', image: 'assets/images/fajitas.webp' },
        ]
    };
    // Return the recipe array corresponding to the given mood
    return recipes[mood];
}