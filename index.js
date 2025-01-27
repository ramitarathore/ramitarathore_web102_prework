/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i< games.length; i++){
        // create a new div element, which will become the game card
        const div = document.createElement("div")

        // add the class game-card to the list
        div.classList.add("game-card")


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `<div> 
            <img src="${games[i].img}" class="game-img">
            <h1>${games[i].name} </h1>
            <p> ${games[i].description}</p>
            <p> Backers: ${games[i].backers} </p>
            <p> Goal: ${games[i].goal} </p>
        </div>`

        // append the game to the games-container
        gamesContainer.append(div);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (currContributions, game) => {
    return currContributions + game.backers;
}, 0);
const contri = document.createElement("div")
contri.classList.add("stats-card")
contri.innerHTML = `<p>${totalContributions.toLocaleString('en-US')}</p>`;
contributionsCard.append(contri);



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalMoneyRaised = GAMES_JSON.reduce(  (currMoneyRaised, game) => {
    return currMoneyRaised + game.pledged;
},0);

// set inner HTML using template literal
const money = document.createElement("div");
money.classList.add("stats-card");
money.innerHTML = `<p> $${totalMoneyRaised.toLocaleString('en-US')}</p>`;
raisedCard.append(money);


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (currGames, game) => {
    return currGames = currGames + 1
}, 0);

// set inner HTML using template literal
const gamesPlayed = document.createElement("div");
gamesPlayed.classList.add("stats-card");
gamesPlayed.innerHTML = `<p> ${totalGames.toLocaleString('en-US')}</p>`;
gamesCard.append(gamesPlayed);

//gamesCard.innerHTML = `<p> ${totalGames.toLocaleString('en-US')} </p>`;




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter(  (game) => {
        return game.goal > game.pledged;
    });
    console.log(unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (game) => {
        return game.goal <= game.pledged;
    });

    console.log(fundedGames)
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    console.log(GAMES_JSON);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}





// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let totalUnfundedGames = GAMES_JSON.reduce( (sum, game) => {
    let counter = game.goal > game.pledged
    return sum + (counter ? 1 : 0);
},0);
console.log(totalUnfundedGames)


const displaystr = (totalUnfundedGames == 0) ? ("We have no unfunded games! THANK YOU ALL FOR THE SUPPORT!!" ) : (totalUnfundedGames + " games don't have enough funding. We need you help to fund these amazing games!");

// create a new DOM element containing the template string and append it to the description container
const descripCon = document.createElement("div");
descripCon.classList.add("description-container");
descripCon.innerHTML = `<p> ${displaystr} </p>`;
descriptionContainer.append(descripCon);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [fundedGame1, fundedGame2, ...others] = sortedGames;
fundedGame1 = fundedGame1.name
fundedGame2 = fundedGame2.name
console.log(fundedGame1.name);
console.log(fundedGame2.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element


const mostFundedGame = document.createElement("div");
mostFundedGame.classList.add("stats-card");
mostFundedGame.innerHTML = `<p> ${fundedGame1} </p>`;
firstGameContainer.append(mostFundedGame);

//firstGameContainer.innerHTML = `<p> ${fundedGame1} </p>`;


// do the same for the runner up item

const secondMostFundedGame = document.createElement("div");
secondMostFundedGame.classList.add("stats-card");
secondMostFundedGame.innerHTML = `<p> ${fundedGame2} </p>`;
secondGameContainer.append(secondMostFundedGame);
