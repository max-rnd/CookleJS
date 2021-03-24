const CONTAINER = document.getElementsByClassName("container")[0]
const URL = "https://8.0.0.1:8000"

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
      console.lgo("Une erreur c'est produite")
      alert("Une erreur c'est produite", "danger")
    }
  })
  .catch((e) => {
    console.log(e)
    alert("Erreur lors de la connexion à la base de donnée", "danger")
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

function alert(msg, type) {
  let div = document.createElement('div')
  div.setAttribute('class', 'alert alert-' + type)
  div.setAttribute('role', 'alert')
  div.innerText = msg
  CONTAINER.insertBefore(div, CONTAINER.firstChild);
}