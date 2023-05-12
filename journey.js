// -------constants----------
const pageAudio = new Audio('Audio/GoodLuck_Final.mp3')
const matchAudio = new Audio('Audio/BackRolls_AE.mp3')

const quotes = [
  `Don't get bitter, just get better.`,
  `I feel like you’re being sabotaged by your inner saboteur.`,
  `It’s okay to fall down. Get up, look sickening, and make them eat it!`,
  `I’m not going to panic because I don’t do that anymore. It’s going to be okay.`,
  `When the going gets tough, the tough reinvent themselves.`,
  `She done already done had herses.`,
  `Well what you wanna do is not necessarily what your gunna do.`,
  `Your tone seems very pointed right now.`
]

const cards = [
  { name: 'd1', img: 'Images/Alaska.png' },
  { name: 'd2', img: 'Images/AlyssaEdwards.jpg' },
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

// -------apps state (variables)---------
let front
let back
let click = 0
let firstCard
let secondCard
let tally //there isn't going to be a winner, its just about how few turns you can do it in
let matchCount = 0
// -------cached element references---------
const CardBoard = document.querySelector('#CardBoard')
let turnTally = document.querySelector('.tally') // tally for the amount of turns the user beat the level in

const cardsAvailable = [...cards, ...cards] // this is a new array doubles the cards array so that each card will have an appropriate match.
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
  } // this is the Fisher-Yates shuffle. An algorithm that generates a random order of an array.

  return array
}
shuffle(cardsAvailable)

let playingCards

const totalCards = cardsAvailable.length
const individual = () => {
  front = document.querySelector('.FRONT')
  back = document.querySelectorAll('.BACK')
} // this is assigning variables to the front and back of each cards that is generated below. All in its own constant.

// -------functions----------
const init = () => {
  tally = 0
  points = 0
  matchCount = 0
  click = 0
}

window.onload = function () {
  document.getElementById('my_audio', 'my_audio2').play()
} // this starts the audio in the game html whenwver the page loads

const cardsFront = () => {
  for (let i = 0; i < cards.length; i++) {
    document.querySelector('.FRONT').innerHTML = `<img src=${cards[i].img}/>`
  } //this is making each card have a different front image based on the above array of cards
}

const randomQuote = () => {
  document.querySelector('.quote').textContent = `"${
    quotes[Math.floor(Math.random() * quotes.length)]
  }"`
} // this generates a random maybe inspirational quote from the above array of quotes from drag race.
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
  }) // this creates the cards in javascript so we don't have to type them all out as constants in HTML. Since the cards are going to change positions every time the page loads.
  individual()
}
createCards() // create a div for every card you have in that cards available Array, take the variable you assigned the div to to .HTML. (Done above)

const renderTally = () => {
  const score = turnTally
  score.innerText = `Tally: ${(tally += 1)}`
} //This keeps track of every 'turn' that takes place. A turn being two clicks.

const playerTurn = (evt) => {
  click++
  console.log(evt.target.parentNode)
  console.log('secondCard', secondCard)
  if (click === 1) {
    firstCard = evt.target
  } else if (click === 2) {
    renderTally()
    secondCard = evt.target
    CardBoard.classList.add('noClick')
    if (firstCard.id !== secondCard.id) {
      setTimeout(() => {
        CardBoard.classList.remove('noClick')
        firstCard.parentNode.classList.remove('hiddenClass')
        secondCard.parentNode.classList.remove('hiddenClass')
      }, 500)
      click = 0
    } else if (firstCard.id === secondCard.id) {
      CardBoard.classList.remove('noClick')
      matchCount++
      matchAudio.currentTime = 0
      matchAudio.play()
      firstCard.classList.add('match')
      secondCard.classList.add('match')
      click = 0
      getWin()
    }
  }
} // This is what I am most proud of and this is the actual gameplay. This establiskes clicks as a turn. For every one click, it targets the event listener below. It does the same on the second click, only then, it checks to see if the id of the revealed second card matches the id of the revealed first card. If they don't match, the cards will wait half a second and then flip back over. You are unable to click on any more cards for that half a second. And that feature was a whole thing. If they do match, they stay flipped over, and you hear Alyssa Edwards say "Backrolls?!" Which I think is hilarious and makes me laugh every time. It also resets the clicks so that the next turn will start with click one. It also adds a class of 'match' to each of the cards with the same id that remain flipped over.

const getWin = () => {
  if (matchCount === 12) {
    turnTally.innerText = `Shantay, you stay! Tally: ${(tally += 1)}`
  }
} // When all 12 pairs of cards have the id of 'match', this function displays a win message and the final turn tally it took for you to make it through.

const restart = () => {
  location.reload()
}
document.getElementById('restartButton').addEventListener('click', restart) // this function adds an event listener that triggers a restart button feature that essentially reloads to page to play again.

// -------event listeners----------
back.forEach((card) => {
  card.addEventListener(
    'click',
    function (evt) {
      card.classList.add('hiddenClass')
      playerTurn(evt)
    },
    true
  )
}) // this is an event listener that removes the back of the card so the front can be potentially matched.

init()

// audio c/o https://www.youtube.com/watch?v=4nVO8qVGZFQ&list=OLAK5uy_lfiVllZ4zSwJZZk4zXrMTFaK_RaGKsYtY and RuPaul's Drag Race.
