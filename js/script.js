function slideToHomePage() {
    const container = document.querySelector('.slide-container');
    container.style.transform = 'translateX(-100%)'; 
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 500); 

    
}



let addbtn = document.getElementById("addbtn");

addbtn.addEventListener("click", addBookdetails);
 function addBookdetails(){
    
    let addbook = document.getElementById("addbook"); 
    let addauthor = document.getElementById("addauthor"); 
    let year = document.getElementById("year"); 
    let addprice = document.getElementById("addprice"); 
    let imagelink = document.getElementById("image-link");
    let page = document.getElementById("bookpages");
    let extract = document.getElementById("bookextract");

    addBook = addbook.value;
    addauthor = addauthor.value;
    year = year.value;
    addprice = addprice.value;
    imagelink = imagelink.value;
    page = page.value;
    extract = extract.value;
    if(addbook != "" && addauthor != "" && year != "" && addprice != ""){
        let bookdetails = {
            bookname :addBook,
            booktitle : addauthor,
            bookyear : year,
            bookprice : addprice,
            bookcover : imagelink,
            bookpage : page,
            bookextract: extract,
            bookfavourite : false


        }
        savebook(bookdetails);
document.getElementById("addbook").value = "";
document.getElementById("addauthor").value = "";
document.getElementById("year").value = "";
document.getElementById("addprice").value = "";
document.getElementById("image-link").value = "";
document.getElementById("bookpages").value = "";
document.getElementById("bookextract").value = "";
       
    }
    
 }

function savebook(bookObject){
let booklist = localStorage.getItem("books");
if(booklist == null){
    let newbooks = [];
    newbooks.push(bookObject);
    localStorage.setItem("books", JSON.stringify(newbooks));

} else{
    booklist2 = JSON.parse(booklist);
    booklist2.push(bookObject);
    localStorage.setItem("books", JSON.stringify(booklist2))
}

renderBook();
}


function fetchBook() {
    let books = localStorage.getItem("books");
    if (books !== null) {
        return JSON.parse(books);
    } else {
        return [];
}
}

function removeBook(title, COVER) {
        let books = fetchBook();
        let indexToDelete = -1;
    
        books.forEach((book, index) => {
            if (book.bookname === title && book.bookcover== COVER) {
                indexToDelete = index;
            }
        });
    
        if (indexToDelete !== -1) {
            books.splice(indexToDelete, 1);
            localStorage.setItem("books", JSON.stringify(books));
        }
        renderBook();
    }

    let removebtn = document.getElementById("removebtn");
    




function renderBook() {
    let main = document.getElementById("action-section1")
    let books = fetchBook();

    main.innerHTML = "" ;

    let row = document.createElement("div");  
    row.className = "row";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        let sectiondiv = document.createElement("div");
        sectiondiv.className = "col-sm-12 col-md-6 col-lg-3";

        let image = document.createElement("img");
        image.className = "img-fluid";
        image.onclick = function(){
            DisplayModal(book);
        };
        image.src = book.bookcover;

        let title = document.createElement("h3");
        title.className = "mt-3";
        title.innerHTML = book.bookname;

        let author = document.createElement("p");
        
        author.innerHTML = "Author: " + book.booktitle;

        let year = document.createElement("p");
        year.innerHTML = "Published: " + book.bookyear;

        let price = document.createElement("p");
        price.innerHTML = "Price: $" + book.bookprice;
        let button = document.createElement("button");
        button.innerHTML= "RemoveBook";
        button.onclick = function(){
            let books = fetchBook();
            book.splice;
            removeBook(book.bookname, book.bookcover);

        };
        let favourite = document.createElement("button");
        favourite.innerHTML = "Favourite book";
        favourite.onclick = function(){
            favourite.style.backgroundColor ="green";
            AddFavourite(book.booktitle, book.bookname);
           
        };

        sectiondiv.appendChild(image);
        sectiondiv.appendChild(title);
        sectiondiv.appendChild(author);
        sectiondiv.appendChild(year);
        sectiondiv.appendChild(price);
        sectiondiv.appendChild(button);
        sectiondiv.appendChild(favourite);
        
        

        row.appendChild(sectiondiv);  
    }

    main.appendChild(row);  
}
document.addEventListener("DOMContentLoaded", function () {
    renderBook();
});
// search option
let searchDetails = document.getElementById("searchDetails");
let searcnbtn = document.getElementById("searchBtn");
 searcnbtn.addEventListener("click", searchresult);

 function searchresult (){
   
    searchDetails = searchDetails.value;
    let books= fetchBook();
   let result = document.getElementById("result");
   
    if (searchDetails == books){
        
    } else if (searchDetails == null){
        result.innerHTML ="please enter a book name";
    }
    else{
        result.innerHTML= "book not found";
    }
 }

//to display book details
 
var modal = document.querySelector(".mymodal");
var modalImage = document.querySelector(".mymodal .modalImage");
var modalTitle = document.querySelector(".mymodal .title");
var modalauth = document.querySelector(".mymodal .author");
var modalabout = document.querySelector(".mymodal .about");
let modalpage = document.querySelector(".pages");
let publish = document.querySelector(".publish");
let price = document.querySelector(".pricelist");
var modalexit = document.querySelector(".k-exit");
 function DisplayModal(book) {
   

    modal.style.display = "block";
    modalImage.src = book.bookcover;
    modalTitle.innerHTML = book.bookname;
    modalauth.innerHTML ="Author: " + book.booktitle;
    publish.innerHTML = "Published:  " + book.bookyear;
    price.innerHTML = "Price: $" + book.bookprice;
    modalpage.innerHTML = "Pages: " + book.bookpage;
    modalabout.innerHTML = book.bookextract;
}
 modalexit.onclick = function(){

    let modalquit = document.querySelector(".k-exit");

     modal.style.display = "none";
 };
// to  add book to favourite
 function AddFavourite(title, name) {
    let books = fetchBook();
    let indexpresent = -1;

    books.forEach((book, index) => {
        if (book.booktitle == title && book.bookname == name) {
            indexpresent = index;
        }
    });

    if (indexpresent !== -1) {
        let bookNow = books[indexpresent] ;
        if (bookNow.bookfavourite == false)
        {
            bookNow.bookfavourite = true;
        }
        else if (bookNow.bookfavourite == true)
        {
            bookNow.bookfavourite = false;
        }
        localStorage.setItem("books", JSON.stringify(books));
    }
  
}
let showfavouritesection = document.getElementById("showfavouritesection");

showfavouritesection.addEventListener("click", displayfavouritebook)

function displayfavouritebook(){

    let main = document.getElementById("action-section1")
    let books = fetchBook();

    main.innerHTML = "" ;

    let row = document.createElement("div");  
    row.className = "row";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        if ( book.bookfavourite == false){
            continue;
        } 

        let sectiondiv = document.createElement("div");
        sectiondiv.className = "col-sm-12 col-md-6 col-lg-3";

        let image = document.createElement("img");
        image.className = "img-fluid";
        image.onclick = function(){
            DisplayModal(book);
        };
        image.src = book.bookcover;

        let title = document.createElement("h3");
        title.className = "mt-3";
        title.innerHTML = book.bookname;

        let author = document.createElement("p");
        
        author.innerHTML = "Author: " + book.booktitle;

        let year = document.createElement("p");
        year.innerHTML = "Published: " + book.bookyear;

        let price = document.createElement("p");
        price.innerHTML = "Price: $" + book.bookprice;
       

        sectiondiv.appendChild(image);
        sectiondiv.appendChild(title);
        sectiondiv.appendChild(author);
        sectiondiv.appendChild(year);
        sectiondiv.appendChild(price);     
        row.appendChild(sectiondiv);  
    }

    main.appendChild(row);  

}
  