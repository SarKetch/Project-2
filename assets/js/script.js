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
        // Highlight the selected button
        for (let btn of buttons) {
            btn.classList.remove('selected');
        }
        button.classList.add('selected');
    }
    function displayRecipesForMood(mood) {
        // Logic to fetch and display three recipes according to 'mood'
        let recipes;

        switch (mood) {
            case 'seafood':
                recipes = displaySeafood();
                break;
            case 'comforting':
                recipes = displayComfort();
                break;
            case 'healthy':
                recipes = displayHealthy();
                break;
            case 'slowcooker':
                recipes = displaySlowCooker();
                break;
            case 'vegetarian':
                recipes = displayVeg();
                break;
            case 'quick':
                recipes = displayQuick();
                break;
        }
        if (recipes && recipes.length > 0) {
            let container = document.getElementById("recipes");
            container.innerHTML = '';

            for (let recipe of recipes) {
                let link = document.createElement('a');
                link.href = recipe.url;
                link.textContent = recipe.title;

                container.appendChild(link);
            }
        }
    }
    function displaySeafood() {
        return getRecipes('seafood');
    }
    function displayComfort() {
        return getRecipes('comforting');
    }
    function displayHealthy() {
        return getRecipes('healthy');
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
    function getRecipes(mood) {
        // Replace this with actual code to fetch recipes
        if (mood === 'seafood') {
            return [
                {
                    title: 'Seafood recipe 1',
                    url: 'https://cafedelites.com/lemon-butter-garlic-salmon/'
                },
                {
                    title: 'Seafood recipe 2',
                    url: 'https://www.simplyrecipes.com/recipes/coconut_curry_mussels/'
                },
                {
                    title: 'Seafood recipe 3',
                    url: 'https://www.bbcgoodfood.com/recipes/prawn-jambalaya'
                }
            ];
        }
        return [];
    }