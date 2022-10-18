
function askCardsQuantity(){
    let cardsQuantity = prompt("Com quantas cartas você deseja jogar?")
    if(cardsQuantity < 4 || cardsQuantity > 14 || cardsQuantity%2 != 0){
        alert("Você deve escolher um número par entre 4 e 14")
        return askCardsQuantity()
    }
    return cardsQuantity
}

function flipCard(card){
    card.querySelector('.back').classList.toggle('hide')
    card.querySelector('.front').classList.toggle('hide')
    
}