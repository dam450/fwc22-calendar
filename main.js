console.info('script started!')


function createCard() {
  return `
      <div class="card">
        <h2>24/11 <span>quinta</span></h2>
        <ul>
          <li>
            <img src="./assets/BRA-flag.svg" alt="bandeira do Brasil" >
            <strong>07:00</strong>
            <img src="./assets/CMR-flag.svg" alt="bandeira de Camarões" >
          </li>
          <li>
            <img src="./assets/BRA-flag.svg" alt="bandeira do Brasil" >
            <strong>07:00</strong>
            <img src="./assets/CMR-flag.svg" alt="bandeira de Camarões" >
          </li>
          <li>
            <img src="./assets/BRA-flag.svg" alt="bandeira do Brasil" >
            <strong>07:00</strong>
            <img src="./assets/CMR-flag.svg" alt="bandeira de Camarões" >
          </li>
        </ul>
      </div>
  `
}

const app = document.querySelector('#app')
const cards = document.querySelector('#cards')

app.innerHTML = ``