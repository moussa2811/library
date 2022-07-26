const booksList = [];
let form = document.querySelector("form");
let mainDiv = document.querySelector(".main");
let booksDiv = document.querySelector(".books");
let nbooks = document.querySelector("#nbooks");
nbooks.innerText = `${booksList.length} book(s)`;

class Book {
    constructor (author,title,pages,readStatus){
        this.id = booksList.length,
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.readStatus = readStatus
    }
    toggleReadStatus = function(){
        this.readStatus = this.readStatus == "Read" ? "Not Read":"Read";
    }
} 

function addBook(){
    let author = document.querySelector("#author").value;
    let title = document.querySelector("#title").value;
    let pages = document.querySelector("#pages").value;
    let readStatus = document.querySelector("#read").checked ? "Read":"Not Read";
    let newBook = new Book(author,title,pages,readStatus);
    booksList.push(newBook);
    addBookDiv(newBook);
    nbooks.innerText = `${booksList.length} book(s)`;
    form.classList.remove("form")
    mainDiv.style.cssText = "border: none;";
}

function addBookDiv(newBook){
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book")
    bookDiv.setAttribute("id", "id"+newBook.id)

    let author = document.createElement("p");
    author.innerText = newBook.author;
    bookDiv.append(author);

    let title = document.createElement("p");
    title.innerText = newBook.title;
    bookDiv.append(title);

    let pages = document.createElement("p");
    pages.innerText = newBook.pages+" page(s)";
    bookDiv.append(pages);

    let readStatus = document.createElement("button");
    readStatus.setAttribute("class","readStatus")
    readStatus.innerText = newBook.readStatus;
    if (newBook.readStatus == "Not Read") {
        readStatus.classList.add("notRead")
    }
    bookDiv.append(readStatus);
    
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("class","removeBook")
    removeBtn.innerText = "Remove";
    bookDiv.append(removeBtn);

    booksDiv.append(bookDiv);

    let bookDivSelector = document.querySelector(`#id${newBook.id}`);
    let readStatusSelector = bookDivSelector.querySelector(".readStatus");
    let removeSelector = bookDivSelector.querySelector(".removeBook");

    readStatusSelector.addEventListener("click",
        ()=>{
            toggleReadStatus(newBook.id,readStatusSelector)
        }
    )

    removeSelector.addEventListener("click",
        ()=>{
            removeBook(newBook.id)
        }
    )
}

function toggleReadStatus(bookId,readStatusSelector) {
    let id = parseInt(bookId);
    booksList[id].toggleReadStatus();
    readStatusSelector.classList.toggle("notRead");
    readStatusSelector.innerText = booksList[id].readStatus;
}

function removeBook(bookId) {
    let id = parseInt(bookId);
    booksList.splice(id,1);
    nbooks.innerText = `${booksList.length} book(s)`;
    booksDiv.removeChild(booksDiv.querySelector("#id"+bookId));
}

document.querySelector("#bookForm").addEventListener("click",
    ()=>{
        form.setAttribute("class","form")
        mainDiv.style.cssText = "border-left: 2px solid #34495e";
    }
);

form.addEventListener("submit",
    (event)=>{
        event.preventDefault();
        addBook();
    }
);