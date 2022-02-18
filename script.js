const form = document.querySelector('.contain');
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.auteur');
const inputGenre = document.querySelector('.genre');
const listBook = document.querySelector('.list-book'); 

let library = {
    
}

// Boucler sur l'objet
function loadHTML(){
    if(!window.localStorage.getItem(`data`)) return;
    const data = JSON.parse(window.localStorage.getItem(`data`));
    library = data;
    Object.keys(library).map(key => createHTML(library[key], key));
}

window.addEventListener('load', loadHTML)

form.addEventListener("submit", createItem);

function createItem(e){
    e.preventDefault();
    const timestamp = Date.now();
    console.log(timestamp);
    // console.log('Form cliqué');
    library[timestamp] = {
            title : inputTitle.value,
            author: inputAuthor.value,
            genre: inputGenre.value,
        
    }

    createHTML(library[timestamp], timestamp);
    saveObj();
    this.reset();
}

function createHTML(objet, key){
    if(!objet.title) return;
    const html = `<span>${objet.title} </span>
    <span>${objet.author}</span>
    <span>${objet.genre}</span>
    <button name="edit" class ="edit">✍️</button>
    <button name="trash" class="trash">🗑️</button>`;

    const li = document.createElement('li');
    li.classList.add('book');
    li.setAttribute(`data-key`, key);
    li.innerHTML = html;
    // listItem.appendChild(li);
    listBook.insertBefore(li, listBook.firstChild);

    li.children.trash.onclick = toBin;
    li.children.edit.onclick = createForm;
}

function toBin(){
    this.parentNode.remove();
    const key = this.parentNode.getAttribute(`data-key`);
    delete library[key];
    saveObj();
}


function saveObj(){
    window.localStorage.setItem(`data`, JSON.stringify(library));
    console.log(key);
}


//Update
function createForm(e) {
    const form = `<form class="update">
    <input placeholder="Modifier titre" id="editTitle">
    <input placeholder="Modifier auteur" id="editAuthor">
    <input placeholder="Modifier genre" id="editGenre">
    <button name="update" class="update">✔️</button>
    </form>
    `
    const key = this.parentNode.getAttribute(`data-key`);
    const li = document.createElement('li');
    const formUpdate = document.querySelector('.update');
    li.classList.add('book');
    li.setAttribute(`data-key`, key);
    li.innerHTML = form;
    // listItem.appendChild(li);
    listBook.insertBefore(li, listBook.firstChild);
    console.log(key)
    formUpdate.addEventListener('submit', toEdit);
}

function toEdit(e){
    e.preventDefault();

    const key = this.parentNode.getAttribute(`data-key`);
    const editTitle = document.querySelector('#editTitle');
    const editAuthor = document.querySelector('#editAuthor');
    const editGenre = document.querySelector('#editGenre');
    console.log(key)

    library[key] = {
        title : editTitle.value,
        author: editAuthor.value,
        genre: editGenre.value
    
}
    console.log(library[key])
    window.localStorage.setItem(data, JSON.stringify(library));
    this.parentNode.remove();
    listBook.innerHTML = "";
    loadHTML();
}