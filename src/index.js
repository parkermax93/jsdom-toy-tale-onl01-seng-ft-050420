const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById('toy-collection');
const toyForm = document.querySelector('.add-toy-form');

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  toyForm.addEventListener('submit', submitForm);
});

function toggleFormContainer() {
  toyFormContainer.classList.toggle('d-none');
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(toy => renderToyCard(toy)));
}

function submitForm(e) {
  e.preventDefault();
  const name = toyForm.elements[0].value;
  const imgUrl = toyForm.elements[1].value;

  if (name != '' && imgUrl != '') {
    let formData = {
      name: name,
      image: imgUrl,
      likes: 0
    };

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:3000/toys', configObj)
    // .then(resp => resp.json())
    // .then(json => renderToyCard(json));
  };
}

function renderToyCard(toyData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('likes', toyData.likes);
  card.setAttribute('toy_id', toyData.id);

  const h2 = document.createElement('h2');
  h2.textContent = toyData.name;
  card.appendChild(h2);

  const img = document.createElement('img');
  img.src = toyData.image;
  img.className = 'toy-avatar';
  card.appendChild(img);

  const p = document.createElement('p');
  p.textContent = toyData.likes;
  card.appendChild(p);

  const button = document.createElement('button');
  button.textContent = 'Like';
  button.className = 'like-btn';
  card.appendChild(button);
  button.addEventListener('click', increaseLike);

  toyCollection.appendChild(card)
}

function increaseLike(e) {
  const attributes = e.target.parentNode.attributes
  let toyId = attributes.toy_id.value;
  let likes = parseInt(attributes.likes.value, 10) + 1;
  e.target.previousSibling.innerText = likes;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: likes
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}