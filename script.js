let cardsFliped = []
let pairsMatched = []
let onTest = false
const possibileCards = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot']

function askCardsQuantity(){
    let cardsQuantity = prompt("Com quantas cartas você deseja jogar?")
    if(cardsQuantity < 4 || cardsQuantity > 14 || cardsQuantity%2 != 0){
        alert("Você deve escolher um número par entre 4 e 14")
        return askCardsQuantity()
    }
    return generateCardsAvaible(cardsQuantity)
}

function shuffleStrings(arr){
    let shuffled = []
    //copia indices do array de strings
    for(i in arr){
        shuffled.push(Number(i))
    }
    //embaralha ordenamento dos indices resgatados
    shuffled.sort((a,b) => {
        return 0.5 - Math.random();
    })
    //cria array que conterá o array com as strings sorteadas
    let newArr = []
    //resgata cada elemento do array com base nos índices embaralhados
    for(i in arr){
        //adiciona o elemento com indice aleatório no array novo (ordena)
        newArr.push(arr[shuffled.shift()])
    }
    return newArr
}

function generateCardsAvaible(quantity){
    let cardOptions = quantity/2
    //resgata todas opções
    let options = [...possibileCards]
    //embaralha opções pra não remover sempre os mesmos itens
    options = shuffleStrings(options)
    //remove opões até que coincida com a quantidade de opções necessárias para a quantidade de cards requisitada
    while(options.length != cardOptions){
        options.pop()
    }
    //dobra cartas para possibilitar um match entre cada uma delas
    for(o in options){
        options.push(options[o])
    }
    //embaralha novo conjunto de cards
    options = shuffleStrings(options)
    return insertCards(options)

}

function insertCards(cardsAvaible){
    let board = document.querySelector('main')
    for(let i=0;i<cardsAvaible.length;i++){
        board.innerHTML += `
            <div onclick="flipCard(this)">
            <div class=" card back" >
                <img src="images/back.png" alt="">
            </div>
            <div class="card front hide">
                <img src="images/${cardsAvaible[i]}.gif" alt="">
            </div>
            </div>
        `
    }
}

function flipCard(card){
    if(pairMatched(card)){
        console.log('Já ta em match')
    }else if(onTest == false) {
        let back = card.querySelector('.back')
        let front = card.querySelector('.front')
        //condição que garante que só vai testar 2 cartas
        if(cardsFliped.length < 2){
            back.classList.toggle('hide')
            front.classList.toggle('hide')
            
            if(back.classList.contains('hide')){
                // se a carta estava virada registra que agora está desvirada
                cardsFliped.push(card)
            } 
            else{
                //caso contrário vira a carta "para baixo" como uma desistencia da opção..o que parando pra pensar agora não é muito justo nesse jogo...
                cardsFliped.pop(card)
            }
            testCards()
            console.log(onTest)
        }
        else if(cardsFliped.length == 2){
            back.classList.toggle('hide')
            front.classList.toggle('hide')
            cardsFliped.pop()
        }
    }
}

function pairMatched(card){
    //resgata face frontal do card
    let cardFront = card.querySelector('.front')
    //resgata url da tag da imagem importada
    let cardSrc = cardFront.querySelector('img').src
    let gifNameRegex = /images\/(.*).gif/
    //filtra o nome da imagem importada com regex
    let cardName = gifNameRegex.exec(cardSrc)[1]
    //verifica se a carta já está em pairsMatched
    let matched = false
    //verifica se o par ja está em match
    for(i in pairsMatched){
        if(pairsMatched[i] == cardName){
            matched = true
        }
    }
    return matched
}

function testCards(){
    if(cardsFliped.length === 2){
        onTest = true
        //resgata faces frontais dos cards
        let card0 = cardsFliped[0].querySelector('.front')
        let card1 = cardsFliped[1].querySelector('.front')
        //resgata url da tag img
        let cardSrc0 = card0.querySelector('img').src
        let cardSrc1 = card1.querySelector('img').src
        let gifNameRegex = /images\/(.*).gif/
        //filtra o nome da imagem importada
        let cardName0 = gifNameRegex.exec(cardSrc0)[1]
        let cardName1 = gifNameRegex.exec(cardSrc1)[1]
        
        if(cardName0 != cardName1){
            console.log('as cartas sao diferentes')
            setTimeout(async () => { flipCard(cardsFliped[1])}, 1000)
            setTimeout(async () => { flipCard(cardsFliped[0])}, 1000)
        }
        else if(cardName0 == cardName1){
            console.log("cartas viradas pra teste: "+cardsFliped.length)
            console.log('as cartas sao iguais')
            cardsFliped.pop()
            cardsFliped.pop()
            pairsMatched.push(cardName0) //registra par com match
        }
        onTest = false
        
    }
    console.log("cartas viradas pra teste: "+cardsFliped.length)
    console.log('E------------------------------')


}