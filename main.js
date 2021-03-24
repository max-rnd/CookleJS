const CONTAINER = document.getElementsByClassName("container")[0]
const URL = "https://127.0.0.1:8000"

let myHeaders = new Headers()
myHeaders.append("accept", "application/json")
let myInit = {
  method: 'GET',
  headers: myHeaders
}

let donnees = fetch(URL + '/api/recipes', myInit)
  .then(res => {
    if (res.ok) {
      res.json().then(data => {
        console.log(data)
        randRecipe(data)
        hydrate(data)
      })
    } else {
      console.error("ERREUR")
    }
  })

function hydrate(data) {
  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  data.forEach(recipe => {
    row.innerHTML += `
      <div class="col">
        <div class="card mt-5" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">
              ${recipe.title}
            </h5>
            <a href="${URL}/recipe/${recipe.id}/edit" class="btn btn-primary">Modifer</a>
          </div>
        </div>
      </div>
    `
  })
  CONTAINER.appendChild(row)
}

function randRecipe(data) {
  let rand = Math.floor(Math.random() * data.length)
  let h = document.createElement('h3')
  h.innerText = "Recette du jour : " + data[rand].title
  CONTAINER.appendChild(h)
}