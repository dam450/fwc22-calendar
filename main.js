
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
    const response = await fetch(
      'https://gist.githubusercontent.com/dam450/605794d4a4ed5ec64bbc6c24c03dea74/raw/0e636ff24967ae529afcc7b1f35fa533811f0541/gamelist.json'
    )
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

function changeTheme() {
  const app = document.querySelector('body')

  const yellow = app.classList.contains('yellow')
  const blue = app.classList.contains('blue')
  const green = app.classList.contains('green') 

  if (yellow) {
    app.classList.replace('yellow', 'blue')
  }else if (blue) {
    app.classList.replace('blue', 'green')
  } else {
    app.classList.replace('green', 'yellow')
  }
}

document.querySelector('#app header').addEventListener('click', changeTheme)