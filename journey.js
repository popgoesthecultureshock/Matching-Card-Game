// -------constants----------
const quotes = [
  `Don't get bitter, just get better.`,
  `I feel like you’re being sabotaged by your inner saboteur.`,
  `It’s okay to fall down. Get up, look sickening, and make them eat it!`,
  `I’m not going to panic because I don’t do that anymore. It’s going to be okay.`,
  `When the going gets tough, the tough reinvent themselves.`,
  `She already done had herses.`
]

const cards = [
  { name: 'd1', img: 'Images/Alaska.png' },
  { name: 'd2', img: 'Images/AlyssaEdwards.png' },
  { name: 'd3', img: 'Images/CocoMontrese.png' },
  { name: 'd4', img: 'Images/Detox.png' },
  { name: 'd5', img: 'Images/Eureka.png' },
  { name: 'd6', img: 'Images/IvyWinters.png' },
  { name: 'd7', img: 'Images/JinkxMonsoon.png' },
  { name: 'd8', img: 'Images/Lineysha.png' },
  { name: 'd9', img: 'Images/Roxxxy.png' },
  { name: 'd10', img: 'Images/SashaVelour.png' },
  { name: 'd11', img: 'Images/SheaCoulee.png' },
  { name: 'd12', img: 'Images/TheTuck.png' }
  // { name: 'd1', img: 'Matching-Card-Game/Images/Aja.png' },
  // { name: 'd7', img: 'Matching-Card-Game/Images/Honey.png' },
  // { name: 'd9', img: 'Matching-Card-Game/Images/Jade.png' },
  // { name: 'd12', img: 'Matching-Card-Game/Images/Penny.png' },
  // { name: 'd15', img: 'Matching-Card-Game/Images/SerenaChaCha.png' },
  // { name: 'd18', img: 'Matching-Card-Game/Images/Vivienne.png' }
]
// Audio?

// -------apps state (variables)---------
let front
let back
// let points
let click = 0
let firstCard
let secondCard
let tally
//there isn't going to be a winner, its just about how few turns you can do it in
// -------cached element references---------
const CardBoard = document.querySelector('#CardBoard')
let turnTally = document.querySelector('.tally') // tally for the amount of turns the user beat the level in

const cardsAvailable = [...cards, ...cards]
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}
shuffle(cardsAvailable)

let playingCards

const totalCards = cardsAvailable.length
const individual = () => {
  front = document.querySelector('.FRONT')
  back = document.querySelectorAll('.BACK')
}

// -------functions----------
const init = () => {
  tally = 0
  // points = 0
  board = null
  activeTurn = false
  // activeCards = null
  click = 0
}

const cardsFront = () => {
  for (let i = 0; i < cards.length; i++) {
    document.querySelector('.FRONT').innerHTML = `<img src=${cards[i].img}/>`
  }
}

const randomQuote = () => {
  document.querySelector('.quote').textContent = `"${
    quotes[Math.floor(Math.random() * quotes.length)]
  }"`
}
randomQuote()

const createCards = () => {
  cardsAvailable.forEach((el) => {
    const card = document.createElement('div')
    card.className = 'TheCards'
    card.innerHTML = `
    <div class="FRONT">
    <img class="frontIMG" src="${el.img}"/>
    </div>
    <div class="BACK">
    <img class="backIMG" id = "${el.name}" src="Images/BACK.png"/>
    </div>`
    CardBoard.append(card)
  })
  individual()
}
createCards() // creat a div for every card you have in that cards available Array, take the variable you assigned the div to to .HTML.

const renderTally = () => {
  const score = turnTally
  score.innerText = `Tally ${(tally += 1)}`
}

const playerTurn = (evt) => {
  click++
  console.log(evt.target.parentNode)
  console.log('secondCard', secondCard)
  if (click === 1) {
    firstCard = evt.target
  } else if (click === 2) {
    secondCard = evt.target
    if (firstCard.id !== secondCard.id) {
      setTimeout(() => {
        firstCard.parentNode.classList.remove('hiddenClass')
        secondCard.parentNode.classList.remove('hiddenClass')
      }, 1000)
      click = 0
    } else if (firstCard.id === secondCard.id) {
      // points++
      addClass = 'match'
      click = 0
    }
    renderTally()
  }
}
// for when the card is clicked, it will turn over, revealing its face to the user.
// The card will stay turned over until a second card is clicked and turned over. When two cards get clicked, a point will be added to the tally board.
// If the numbers on the cards are the SVGMaskElement, the cards will stay flipped over. If the numbers are different, the cards will turn back around.
// ONce all the cards are turned over (all matches have been made), the game will be finished.
// Each time the game SVGTransformList, the cards will be randomly set to each spot.
// -------event listeners----------
back.forEach((card) => {
  card.addEventListener('click', function (evt) {
    console.log(evt.target)
    card.classList.add('hiddenClass')
    console.log(card)
    playerTurn(evt)
  })
})
// listen for a click on any card. Then any other card. Then after the second click, turn both cards back around if they dont matchMedia.
init()
