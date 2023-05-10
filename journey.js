// -------constants----------
const pageAudio = new Audio('Audio/GoodLuck_Final.mp3')

const quotes = [
  `Don't get bitter, just get better.`,
  `I feel like you’re being sabotaged by your inner saboteur.`,
  `It’s okay to fall down. Get up, look sickening, and make them eat it!`,
  `I’m not going to panic because I don’t do that anymore. It’s going to be okay.`,
  `When the going gets tough, the tough reinvent themselves.`,
  `She already done had herses.`,
  `Well what you wanna do is not necessarily what your gunna do.`,
  `Your tone seems very pointed right now.`
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
]
// Audio?

// -------apps state (variables)---------
let front
let back
let points
let click = 0
let firstCard
let secondCard
let tally //there isn't going to be a winner, its just about how few turns you can do it in
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
  points = 0
  board = null
  activeTurn = false
  // activeCards = null
  click = 0
}

window.onload = function () {
  document.getElementById('my_audio').play()
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
  score.innerText = `Tally: ${(tally += 1)} "/n" Snatches: ${points++}`
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
        if (click === 2) {
          click = null
        }
      }, 1000)
      click = 0
    } else if (firstCard.id === secondCard.id) {
      points++
      addClass = 'match'
      click = 0
    }
    renderTally()
  }
}

// -------event listeners----------
back.forEach((card) => {
  card.addEventListener('click', function (evt) {
    console.log(evt.target)
    card.classList.add('hiddenClass')
    console.log(card)
    playerTurn(evt)
  })
})

init()

// audio c/o https://www.youtube.com/watch?v=4nVO8qVGZFQ&list=OLAK5uy_lfiVllZ4zSwJZZk4zXrMTFaK_RaGKsYtY and RuPaul's Drag Race.
