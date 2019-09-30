let cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}];


// use a Fisher-Yates shuffle

function shuffle(array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle...
	while (m) {

		// Pick a remaining element...
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

let cardsInPlay = null;
let score = 0;
let roundsPlayed = 0;

function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
		score += 10;
} 	else {
  		alert("Sorry, try again.");
}
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
}

function createBoard() {
	cards = shuffle(cards);
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
	cardsInPlay = [];
}

createBoard();

function keepScore() {
	document.getElementById('score').innerHTML = score;
}
	
keepScore();

function restartGame() {
	// why does removeChild() not lead to same outcome as innerHTML below?
	document.getElementById('game-board').innerHTML = "";
		createBoard();
		roundsPlayed += 1;
		document.getElementById('round').innerHTML = roundsPlayed;
		keepScore();
	}

document.querySelector('button').addEventListener('click', restartGame);