const options = {
  method: 'GET',
  url: 'https://free-football-soccer-videos.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'free-football-soccer-videos.p.rapidapi.com',
    'x-rapidapi-key': '6ca7dfafc2msh93f655fa94295f5p141e25jsn1a0f6b6c34c2',
  },
}

axios
  .request(options)
  .then(function (response) {
    const cards = document.querySelector('#cards')

    response.data.forEach((data) => {
      const node = document.createElement('div')
      node.className = 'col-md-3 col-sm-6 text-center my-2'
      node.innerHTML += ` <div class="card" style="width: 18rem">
      
      <img src=${data.thumbnail} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">
        ${data.competition.name}
        </p>
        <a  href="" data-bs-toggle="modal" data-bs-target="#modalYT"  id=${data.competition.id} class="btn btn-primary">summarize of match</a>
      </div>
    </div> `

      cards.appendChild(node)
    })
    const btnDetails = document.querySelectorAll('.btn-primary')
    btnDetails.forEach((btnDetail) => {
      btnDetail.addEventListener('click', (e) => {
        e.preventDefault()
        const soccerInfo = response.data.filter(
          (soccer) =>
            soccer.competition.id == e.target.id &&
            e.target.parentElement.firstElementChild.textContent == soccer.title
        )
        window.open(soccerInfo[0].url)
      })
    })

    const searchBtn = document.querySelector('#search')

    searchBtn.addEventListener('submit', (e) => {
      e.preventDefault()

      const setValue = document.querySelector('input').value

      // console.log(document.querySelector('input').value)
      const newArr = response.data.filter((data) =>
        data.title.includes(
          setValue.charAt(0).toUpperCase() + setValue.slice(1).toLowerCase()
        )
      )

      const cards = document.querySelector('#cards')
      cards.innerHTML = ''
      newArr.forEach((data) => {
        const node = document.createElement('div')
        node.className = 'col-md-3 col-sm-6 text-center my-2'
        node.innerHTML += ` <div class="card" style="width: 18rem">
          
          <img src=${data.thumbnail} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">
            ${data.competition.name}
            </p>
            <a  href="" data-bs-toggle="modal" data-bs-target="#modalYT"  id=${data.competition.id} class="btn btn-primary">summarize of match</a>
          </div>
        </div> `

        cards.appendChild(node)
      })
    })
  })
  .catch(function (error) {
    console.error(error)
  })
