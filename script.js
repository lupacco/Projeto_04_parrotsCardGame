/**
 * @brief Parrot Game - Lucas Pagotto C. Oliveira - 23/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 

let cardOptions;
let cardsFliped = []
let pairsMatched = []
let onTest = false
const possibileCards = ['bobrossparrot','explodyparrot','fiestaparrot','metalparrot','revertitparrot','tripletsparrot','unicornparrot']
//variaveis para atualizar valor no timer
let secondsInc = 0
let seconds = 57
let minutesInc = 0
let minutes = 0
//inicia timer
function startTimer(){
    const gameTimer = document.querySelector('.timer')
    // formata para 2 digitos pro diplay ser 00 aoinvés de 0
    seconds = formatNumberTo2digits(seconds)
    minutes = formatNumberTo2digits(minutes)
    //insere 00:00 como valor inicial
    gameTimer.innerHTML = `
    <div><span class="min">00</span>:<span class="sec">00</span></div>
    `
    if(gameTimer !== null){
        //incrementa contador de segundos
        secondsIncrementer = setInterval(() => {
            const secondsSpan = document.querySelector('.sec')
            secondsSpan.innerHTML = seconds
            seconds++
            seconds = formatNumberTo2digits(seconds)
            if(seconds == 60) {
                const minutesSpan = document.querySelector('.min')
                console.log(minutes)
                seconds = 0
                minutes++
                minutes = formatNumberTo2digits(minutes)
                minutesSpan.innerHTML = minutes
            }
        }, 1000);
    }
}
//formata numero para dois digitos
function formatNumberTo2digits(number) {
    number = number.toLocaleString('pt-br', {
        minimumIntegerDigits: 2,
      });
    return number;
}
//Verifica s eo jogo terminou
function isGameFinished(){
    if(pairsMatched.length == cardOptions){
        let res = prompt("Deseja jogar novamente? Responda com 'sim' caso queira :)")
        if(res == "sim"){
            removeCards()
            askCardsQuantity()
        }
    }
}
//Pergutna quantas cartas devem ser exibidas na tela
function askCardsQuantity(){
    let cardsQuantity = prompt("Com quantas cartas você deseja jogar?")
    if(cardsQuantity < 4 || cardsQuantity > 14 || cardsQuantity%2 != 0){
        alert("Você deve escolher um número par entre 4 e 14")
        return askCardsQuantity()
    }
    return generateCardsAvaible(cardsQuantity)
}
//método que embaralha array de strings
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
//Gera cards disponíveis pra jogo com base na entrada do usuário
function generateCardsAvaible(quantity){
    cardOptions = quantity/2
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
//insere cartas na tela
function insertCards(cardsAvaible){
    let board = document.querySelector('main')
    board.innerHTML = `
        <div class="timer">
            
        </div>
    `
    for(let i=0;i<cardsAvaible.length;i++){
        board.innerHTML += `
            <div class="cardSection" onclick="flipCard(this)">
            <div class=" card back" >
                <img src="images/back.png" alt="">
            </div>
            <div class="card front hide">
                <img src="images/${cardsAvaible[i]}.gif" alt="">
            </div>
            </div>
        `
    }
    startTimer()
}
//remove cartas da tela
function removeCards(){
    let board = document.querySelector('main')
    board.innerHTML = ""
    pairsMatched = []
    cardsFliped = []
}

//vira carta
function flipCard(card){
    //resgata frente e verso do card que invocou a função
    let back = card.querySelector('.back')
    let front = card.querySelector('.front')

    if(pairMatched(card)){
        console.log('par já ta em match')
    }
    else if(onTest == false) {
        //condição que garante que só vai testar 2 cartas
        if(cardsFliped.length < 2){
            back.classList.toggle('hide')
            front.classList.toggle('hide')
            
            if(back.classList.contains('hide')){
                // se a carta estava virada registra que agora está desvirada
                cardsFliped.push(card)
            } 
            else{
                //caso contrário vira a carta "para baixo" como uma desistencia da opção..o que parando pra pensar agora não é muito justo nesse jogo...mas acredito que basta remover esse else para mudar a regra do jogo
                cardsFliped.pop(card)
            }
            testCards()
        }
    }
    else if(onTest == true && cardsFliped.length > 0){
        back.classList.toggle('hide')
        front.classList.toggle('hide')
        cardsFliped.pop()
    }
}
//verifica se o par de cartas já foi encontrado
function pairMatched(card){
    let matched = false
    let cardName = getCardName(card)
    //verifica se a carta já está em pairsMatched
    for(i in pairsMatched){
        if(pairsMatched[i] == cardName){
            matched = true
        }
    }
    return matched
}
//finaliza teste
function endTest(){
    onTest = false
}
//pega nome do card com base na url da imagem
function getCardName(card){
    //resgata faces frontais dos cards
    let cardFace = card.querySelector('.front')
    if(cardFace!=null){
    //resgata url da tag img
        let cardSrc = cardFace.querySelector('img').src
        //filtra o nome da imagem importada
        let gifNameRegex = /images\/(.*).gif/
        let cardName = gifNameRegex.exec(cardSrc)[1]

        return cardName
    }
}
//testa se as cartas selecionadas são iguais ou diferentes
function testCards(){
    if(cardsFliped.length === 2){
        //remove funcionalidade de virar cartas de todas as cartas que não sejam as que estão em teste
        const lockCards = () => {
            let cards = document.querySelectorAll('.cardSection')
            Array.from(cards).filter((card)=>{
                if(card != cardsFliped[0] || card != cardsFliped[1]){
                    card.setAttribute('onclick','')
                }
            })
        }
        lockCards()
        console.log('começou um teste')
        onTest = true
        
        let cardName0 = getCardName(cardsFliped[0])
        let cardName1 = getCardName(cardsFliped[1])
        
        if(cardName0 != cardName1){
            console.log('as cartas sao diferentes')
            setTimeout(() => { flipCard(cardsFliped[1])
                               flipCard(cardsFliped[0])
                            }, 1000)
            setTimeout(() => { endTest()}, 1000)
        }
        else if(cardName0 == cardName1){
            console.log('as cartas sao iguais')
            cardsFliped.pop().setAttribute('onclick','') //remove funcão de virar carta do onclick
            cardsFliped.pop().setAttribute('onclick','') //remove funcão de virar carta do onclick
            pairsMatched.push(cardName0) //registra par com match
            setTimeout(() => { endTest()}, 1000)
        }
        //devolve funcionalidade de virar cartas para todas as cartas que não estiverem em match
        const unlockCards = () => {
            let cards = document.querySelectorAll('.cardSection')
            Array.from(cards).filter((card)=>{
                if(card != cardsFliped[0] || card != cardsFliped[1] || pairMatched(card) == false){
                    card.setAttribute('onclick','flipCard(this)')
                }
            })
        }
        //espera um tempo antes de liberar cartas pra nao ser possível ter mais de 2 cartas viradas em jogo
        setTimeout(() => {unlockCards()}, 1000)
        console.log('terminou um teste')

        setTimeout(() => {isGameFinished()}, 1000)
    }
}