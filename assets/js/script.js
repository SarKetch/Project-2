document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("id") === "submit-btn") {
                displayRecipes(); 
            } else if (this.classList.contains("round-button")) {
                selectMood(this);
            } else if (this.getAttribute("id") === "refresh-btn") {
                location.reload();  
            }
        });
    }

function selectMood {
    
}

function getRecipes {

}

function displaySeafood {

}

function displayComfort {

}

function displayHealthy {

}

function displaySlowCooker {

}

function displayVeg {

}

function displayQuick {

}