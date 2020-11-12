const content = document.querySelector(".content");
const button = document.querySelector(".j-btn");
const input = document.querySelector(".j-input")

function getRandomBreed(breed) {
    if (!isNaN(breed)) {
        content.innerHTML = `<p>Введите породу</p>`
    } else {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then((response) => { return response.json() })
    .then((data) => {
        content.innerHTML = `<img src="${data.message}" alt="Dog">`
    })
    }    
}

button.addEventListener('click', () => {
    getRandomBreed(input.value);
})