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
            link.target = '_blank';

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
            { title: 'White Pork Ragu', url: 'https://www.theburntbuttertable.com/white-pork-ragu/', image:'assets/images/whiteragu.webp', },
            { title: 'Osso Bucco', url: 'https://www.bestrecipes.com.au/recipes/osso-buco-slow-cooker-recipe/bbvbzngh', image: 'assets/images/ossobucco.webp'},
            { title: 'Lemon Artichoke Chicken', url: 'https://fitslowcookerqueen.com/slow-cooker-chicken-artichokes-whole30-paleo/', image: 'assets/images/lemonartichokechicken.webp'},
            { title: 'Asian Braised Beef', url: 'https://www.thelittleepicurean.com/slow-cooker-asian-braised-beef/?utm_campaign=shareaholic&utm_medium=facebook&utm_source=socialnetwork', image: 'assets/images/asianbraisedbeef.webp'},
            { title: 'Welsh Lamb Hotpot', url: 'https://www.supergoldenbakes.com/lamb-hotpot/', image: 'assets/images/lambhotpot.webp'},
            { title: 'Chicken Curry', url: 'https://www.supergoldenbakes.com/slow-cooker-chicken-curry/', image: 'assets/images/chickencurry.webp'},
        ],
        'vegetarian': [
            { title: 'Vegan Thai Green Curry', url: 'https://www.olivemagazine.com/recipes/quick-and-easy/vegan-thai-green-curry/', image: 'assets/images/green_curry_01-d12b810.webp'},
            { title: 'Burnt Aubergine Veggie Chilli', url: 'https://www.bbcgoodfood.com/recipes/burnt-aubergine-veggie-chilli', image: 'assets/images/auberginechili.webp'},
            { title: 'Sticky Sesame Cauliflower', url: 'https://www.tashasartisanfoods.com/blog/sticky-sesame-cauliflower/', image: 'assets/images/stickysesamecauliflower.webp'},
            { title: 'Crispy Gochujang Korean Tofu', url: 'https://eatwithclarity.com/gochujang-korean-tofu/?ssp_iabi=1684055153711', image: 'assets/images/koreantofu.webp'},
            { title: 'Mushroom Risotto with Frizzled Leeks', url: 'https://www.feastingathome.com/mushroom-risotto/', image: 'assets/images/Mushroom-Risotto_.webp' },
            { title: 'Crispy Black Bean Tacos', url: 'https://playswellwithbutter.com/crispy-black-bean-tacos/', image: 'assets/images/blackbeantacos.webp' },

        ],
        'quick': [
            { title: 'Honey Garlic Chicken', url: 'https://www.kitchensanctuary.com/honey-garlic-chicken/', image: 'assets/images/honeygarlicchicken.webp' },
            { title: '20 Minute Thai Basil Beef Rolls.', url: 'https://www.halfbakedharvest.com/beef-rolls/?adt_ei', image: 'assets/images/thaibeefrolls.webp' },
            { title: '10 Minute Peanut Sauce Rice Noodles', url: 'https://thetwincookingproject.net/10-minute-peanut-sauce-rice-noodles/?utm_medium=social&utm_source=pinterest&utm_campaign=tailwind_tribes&utm_content=tribes&utm_term=1047384384_49051868_81643', image: 'assets/images/peanutnoodles.jpg.webp' },
            { title: 'Steak Tips and Mushrooms', url: 'https://www.thekitchn.com/recipe-easy-balsamic-glazed-steak-tips-and-mushrooms-249798', image: 'assets/images/beeftipswithmushrooms.webp' },
            { title: 'Spicy Ground Pork & Zucchini Stir-Fry', url: 'https://www.thekitchn.com/spicy-ground-pork-amp-zucchini-stir-fry-247254', image: 'assets/images/porkandcourgette.webp' },
            { title: 'Sheet Pan Chicken Fajitas', url: 'https://damndelicious.net/2019/07/24/sheet-pan-chicken-fajitas/', image: 'assets/images/fajitas.webp' },
        ]
    };
    return recipes[mood];
}