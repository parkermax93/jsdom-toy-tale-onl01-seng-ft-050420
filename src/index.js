let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => cardsInfo(data));

  function createCard(toy) {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    let h2 = document.createElement("h2");
    h2.textContent = toy.name
    card.appendChild(h2)
    let image = document.createElement("img");
    image.setAttribute('src',toy.image);
    image.setAttribute('class', 'toy-avatar');
    card.appendChild(image);
    let p = document.createElement("p");
    p.textContent = `${toy.likes} likes`;
    card.appendChild(p);
    let button = document.createElement("button");
    button.setAttribute('class','like-btn');
    button.textContent = `Like <3`;
    button.addEventListener('click', (event) => {
      toy.likes = toy.likes + 1;
      p.textContent = `${toy.likes} likes`;
      increaseLikes(toy);
    });
    card.appendChild(button);
    let editButton = document.createElement("button");
    editButton.textContent = `Edit`;
    editButton.addEventListener('click',(event) => {
      if(editButton.innerText === "Save") {
        editButton.innerText = "Edit"
        //grab value of inpt field
        let newToyName = document.getElementById(`edit-${toy.id}`).value
        // make patch request to update toy
        //remove input field

        h2.innerHTML = newToyName
      } else {
        editButton.innerText = "Save"
        h2.innerHTML= `<input type='text' id='edit-${toy.id}' value='${h2.innerText}' ></input>`
        //replace the tpys name with input field
      }
    })
    card.appendChild(editButton);
    let toyCollection = document.getElementById("toy-collection");
    toyCollection.appendChild(card);
  }



  function cardsInfo(toys){
    for (const toy of toys){
      createCard(toy);
    }
  }

  function increaseLikes(toy) {
      let formData = {
      likes: toy.likes
    };
    let configObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  }

  let addToyForm = document.getElementsByClassName("add-toy-form")[0];
  addToyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let nameInput = document.getElementsByName("name")[0];
    let imageInput = document.getElementsByName("image")[0];
    submitData(nameInput.value, imageInput.value);
    nameInput.value = "";
    imageInput.value = "";
  });

  function submitData(name,image){
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
    .then(toy => {
      createCard(toy);

    });
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});