let deckId;
let comupterCard;
let playerCard;
const winnerText = document.getElementById("winnerText")
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const remainingCards = document.getElementById("remainingCards");
const computerScoreBoard = document.getElementById("computerScore");
const playerScoreBoard = document.getElementById("playerScore");
let computerScore = 0;
let playerScore = 0;

newDeckBtn.addEventListener("click", handledeck);

function handledeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id;
    })
    drawBtn.style.visibility = "visible";
    
}

drawBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("card-computer").innerHTML = `<img src='${data.cards[0].image}'/>`
        document.getElementById("card-player").innerHTML = `<img src='${data.cards[1].image}'/>`
        console.log(data);
        comupterCard = data.cards[0].value;
        playerCard = data.cards[1].value;
        checkWinner(comupterCard, playerCard);
        remainingCards.textContent = ` ${data.remaining}`;
        if(data.remaining === 0){
            drawBtn.style.visibility = "hidden";
            if(computerScore > playerScore){
                winnerText.textContent = "The Computer won the Game !!"
            } else if( computerScore < playerScore){
                winnerText.textContent = "YOU won the Game !!"
            } else {
                winnerText.textContent = "It's Tie"
            }
        }
    })

})

function checkWinner(computer, player) {
    if(computer === "JACK") computer = 11
    if(player === "JACK") player = 11
    if(computer === "QUEEN") computer = 12
    if(player === "QUEEN") player = 12
    if(computer === "KING") computer = 13
    if(player === "KING") player = 13
    if(computer === "ACE") computer = 14
    if(player === "ACE") player = 14
    if(computer > player){
        winnerText.textContent  = "computer win";
        computerScoreBoard.textContent =  computerScore += 1;
    }
    if(computer < player){
        winnerText.textContent  = "YOU win !";
        playerScoreBoard.textContent = playerScore += 1;
    }
    if(computer === player){
        winnerText.textContent  = "It's WAR !!";
        computerScore += 0;
        playerScore += 0;
    }
}

