const myLibrary = [];

class Book {
  constructor(title, author, pages, coverImage, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.coverImage = coverImage;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
  displayBooks();
}

function displayBooks() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    const content = document.createElement("div");

    card.classList.add("card");
    card.dataset.index = index;

    content.classList.add("content");
    content.dataset.index = index;

    card.innerHTML = `
      <img src="${book.coverImage}" alt="${book.title} cover"> 
    `;

    content.innerHTML = `
    <h1>${book.title}</h1>
    <p>${book.author}</p>
    <p>Number of pages: ${book.pages}</p>
    <p>Read: ${book.read ? "Yes" : "No"}</p>
    <button class="toggle-read-button">Toggle Read</button>
    <button class="delete">Delete</button>
    `;

    container.appendChild(card);
    card.appendChild(content);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("formContainer");
  const addBookbtn = document.getElementById("add");
  const cancelButton = document.getElementById("cancelButton");
  const bookForm = document.getElementById("bookForm");

  console.log(myLibrary);
  addBookbtn.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
  });

  cancelButton.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    console.log("cancel");
  });

  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const coverImageFile = document.getElementById("coverImage");
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const files = coverImageFile.files[0];
    console.log(files);
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        const coverImage = this.result;
        const newBook = new Book(title, author, pages, coverImage, read);
        addBookToLibrary(newBook);
        formContainer.classList.add("hidden");
        bookForm.reset();
      });
    }
  });

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      const card = event.target.closest(".card");
      const index = card.dataset.index;
      myLibrary.splice(index, 1);
      displayBooks();
    }

    if (event.target.classList.contains("toggle-read-button")) {
      const card = event.target.closest(".card");
      const index = card.dataset.index;
      myLibrary[index].toggleRead();
      displayBooks();
    }
  });
});
