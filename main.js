
function createGame(player1, hour, player2) {
  return `
    <li>
      <img src="./assets/${player1}-flag.svg" alt="bandeira do ${player1}" />
      <strong>${hour}</strong>
      <img src="./assets/${player2}-flag.svg" alt="bandeira de ${player2}" />
    </li>
  `
}

function createGame2(player1, hour, player2) {
  const listItem = document.createElement('li')

  listItem.innerHTML = `
    <img src="./assets/${player1}-flag.svg" alt="bandeira do ${player1}" title="${player1}" />
      <strong>${hour}</strong>
    <img src="./assets/${player2}-flag.svg" alt="bandeira de ${player2}" title="${player2}" />
  `

  return listItem
}

function getWeekDay(stringDate) {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const [day, month, year] = stringDate.split('/')
  const date = new Date(year, month - 1, day)

  const weekDay = weekDays[date.getDay()]

  return weekDay
  
}

function* generateDelay(i) {
  let delay = -i
  while (true) {
    yield (delay+=i)
  }
}

const delay = generateDelay(400)

//let delay = -300
function createCard(date, weekDay, games) {
  //delay += 300
  return `
      <div class="card" style="animation-delay: ${delay.next().value}ms">
        <h2>${date} <span>${weekDay}</span></h2>
        <ul id="ul">
          ${games}
        </ul>
      </div>
  `
}

function createCard2(date) {
  //delay += 300
  const card = document.createElement('div')
  card.classList.add('card')
  card.style.animationDelay = `${delay.next().value}ms`

  card.innerHTML = `
    <h2>${date} <span>${getWeekDay(date)}</span></h2>
    <ul id="matches">
    </ul>
  ` 
  return card
}



async function getGameData() {
  let gameData
  try {
    const response = await fetch('./data/gamelist.json')
    const data = await response.json()
    gameData = data['match-days']
    return gameData 
    
  } catch (error) {
    console.error(error)
    return  []
  }
}

const app = document.querySelector('#app')
const cards = document.querySelector('#cards')

// cards.innerHTML = `
//       ${createCard(
//         '24/11',
//         'quinta',
//         createGame('BRA', '07:00', 'CMR') + createGame('BRA', '07:00', 'CMR')
//       )}  
//       ${createCard('28/11', 'segunda', createGame('BRA', '07:00', 'CMR'))}  
//       ${createCard('02/12', 'sexta', createGame('ARG', '09:00', 'COL'))}
// `

getGameData().then(data => {

  data.map(gameDay => {
    const card = createCard2(gameDay.date)
    const matchList = card.querySelector('ul#matches')

    gameDay.matches.map(match => {
      matchList.appendChild(createGame2(match.player1, match.time, match.player2))
    })

    document.querySelector('#cards').appendChild(card)
  })

})