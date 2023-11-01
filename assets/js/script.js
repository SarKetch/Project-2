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

    let recipes = {
        'slowcooker': [
            { title: 'White Pork Ragu', url: 'https://www.theburntbuttertable.com/white-pork-ragu/', image:'assets/images/whiteragu1-1638x2048.jpeg', },
            { title: 'Osso Bucco', url: 'https://www.bestrecipes.com.au/recipes/osso-buco-slow-cooker-recipe/bbvbzngh', image: ''},
            { title: 'Lemon Artichoke Chicken', url: 'https://fitslowcookerqueen.com/slow-cooker-chicken-artichokes-whole30-paleo/'},
            { title: 'Asian Braised Beef', url: 'https://www.thelittleepicurean.com/slow-cooker-asian-braised-beef/?utm_campaign=shareaholic&utm_medium=facebook&utm_source=socialnetwork'},
            { title: 'Welsh Lamb Hotpot', url:'https://www.supergoldenbakes.com/lamb-hotpot/'},
            { title: 'Chicken Curry', url: 'https://www.supergoldenbakes.com/slow-cooker-chicken-curry/'},
        ],
        'vegetarian': [
            { title: 'Vegan Thai Green Curry', url: 'https://www.olivemagazine.com/recipes/quick-and-easy/vegan-thai-green-curry/' },
            { title: 'Burnt Aubergine Veggie Chilli', url: 'https://www.bbcgoodfood.com/recipes/burnt-aubergine-veggie-chilli', image: ''},
            { title: 'Sticky Sesame Cauliflower', url: 'https://www.tashasartisanfoods.com/blog/sticky-sesame-cauliflower/', image: ''},
            { title: 'Crispy Gochujang Korean Tofu', url: 'https://eatwithclarity.com/gochujang-korean-tofu/?ssp_iabi=1684055153711', image: '' },
            { title: 'Mushroom Risotto with Frizzled Leeks', url: 'https://www.feastingathome.com/mushroom-risotto/', image: '' },
            { title: 'Crispy Black Bean Tacos', url: 'https://playswellwithbutter.com/crispy-black-bean-tacos/', image: '' },

        ],
        'quick': [
            { title: 'Honey Garlic Chicken', url: 'https://www.kitchensanctuary.com/honey-garlic-chicken/' },
            { title: '20 Minute Thai Basil Beef Rolls.', url: 'https://www.halfbakedharvest.com/beef-rolls/?adt_ei', image: '' },
            { title: '10 Minute Peanut Sauce Rice Noodles', url: 'https://thetwincookingproject.net/10-minute-peanut-sauce-rice-noodles/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=1047384384_49051868_81643', image: '' },
            { title: 'Easy Balsamic Glazed Steak Tips and Mushrooms', url: 'https://www.thekitchn.com/recipe-easy-balsamic-glazed-steak-tips-and-mushrooms-249798', image: '' },
            { title: 'Spicy Ground Pork & Zucchini Stir-Fry', url: 'https://www.thekitchn.com/spicy-ground-pork-amp-zucchini-stir-fry-247254', image: '' },
            { title: 'Sheet Pan Chicken Fajitas', url: 'https://damndelicious.net/2019/07/24/sheet-pan-chicken-fajitas/', image: '' },
        ]
    };
    return recipes[mood];
}