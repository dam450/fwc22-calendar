
function createGame(player1, hour, player2) {
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


function createCard(date) {
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

getGameData().then(data => {
  data.map(gameDay => {
    const card = createCard(gameDay.date)
    const matchList = card.querySelector('ul#matches')

    gameDay.matches?.map(match => {
      const { player1, player2, time } = match
      matchList.appendChild(createGame(player1, time, player2))
    })

    document.querySelector('#cards').appendChild(card)
  })
})