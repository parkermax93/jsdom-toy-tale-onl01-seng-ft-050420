let addToy = false
const toysUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
})

const fetchToys = () => {
  return fetch(toysUrl)
    .then(resp => resp.json())
    .then(json => renderToyDivCards(json))
}

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})

document.addEventListener("DOMContentLoaded", ()=>{
  const addToyForm = document.querySelector('#addtoyform')
  addToyForm.addEventListener('submit', function (event) {
    submitData(event.name, event.image)
  })
})

const addLike = function (event) {
  event.preventDefault()
  
  let addedLike = document.getElementById(event.target.id);
  let integer = parseInt(addedLike.querySelector('p').innerText);
  let updatedNumber = integer + 1;

  const configLikes = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updatedNumber
    })
  };

  let toyId = event.target.id - 1;
  let url = `http://localhost:3000/toys/${toyId}`; 

  fetch(url, configLikes)
    .then(response => response.json())
    .then((obj) => {addedLike.querySelector('p').innerText = `${updatedNumber} likes`})
}

function renderToyDivCards(toys) {
  const toyCollection = document.getElementById('toy-collection');
  toys.map((toy) => {
    const toyDivCard = document.createElement('div');
    toyDivCard.setAttribute('id', toy.id)
    toyDivCard.classList.add('card');
    toyDivCard.style.backgroundColor = "red";

    const h2ToyName = document.createElement('h2');
    h2ToyName.textContent = toy.name;
    toyDivCard.appendChild(h2ToyName);

    const imgAvatar = document.createElement('img');
    imgAvatar.setAttribute("src", toy.image);
    imgAvatar.classList.add('toy-avatar');
    toyDivCard.appendChild(imgAvatar);

    const pLikes = document.createElement('p');
    pLikes.textContent = toy.likes;
    toyDivCard.appendChild(pLikes);

    const likeButton = document.createElement('button');
    likeButton.setAttribute('id', toy.id)
    likeButton.classList.add('like-btn');
    likeButton.innerText =  "❤️";
    likeButton.addEventListener("click", addLike);
    toyDivCard.appendChild(likeButton);

    toyCollection.appendChild(toyDivCard);
  })
}

function submitData(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  
  return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => renderToyDivCards(json))
    .catch(function (error) {
      let h2 = document.createElement('h2');
      h2.innerHTML = "Bad Access";
      document.body.appendChild(h2);
      alert("Bad Access");
      console.log(error.message);
    });
}