const main=document.querySelector(".main");
const addBkBtn=document.querySelector("#addBookBtn");
const dialog=document.querySelector("#popup");
const form = document.querySelector("form");
const content=document.querySelector(".content");
const myLibrary=[];

//constructor
function Book(title,author,no_of_pages){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.no_of_pages=no_of_pages;
    this.isRead=false;
    this.info=function(){
        const status=this.isRead ? "already read." : "not read yet.";
        return `${this.title} by ${this.author}, ${this.no_of_pages} pages, is ${status}`;
      }
}
//add book function 
function addBook(title,author,no_of_pages){
    const newBook=new Book(title,author,no_of_pages);
    myLibrary.push(newBook);
}
const book1=new Book("The Hobbit","J.R.R. Tolkien",292);
myLibrary.push(book1);
const book2=new Book("A Tale of Two Cities","Charles Dickens",470);
myLibrary.push(book2);
const book3=new Book("Metamorphosis","Franz Kafka",78);
myLibrary.push(book3);


function displayBooks(){
  main.innerHTML = "";
    for (let i=0;i<myLibrary.length;i++){
        const div=document.createElement("div");
        div.classList.add("card");
        div.setAttribute("data-id",myLibrary[i].id);

        const part1=document.createElement("div");
        part1.classList.add("part1");
        const deleteBtn=document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent="❌";
        const title=document.createElement("h4");
        title.textContent=myLibrary[i].title;
        part1.appendChild(deleteBtn);
        part1.appendChild(title);
        deleteBtn.addEventListener("click", () => {
          const idToDelete = div.getAttribute("data-id");
          const index = myLibrary.findIndex(book => book.id === idToDelete);
          if (index !== -1) {
            myLibrary.splice(index, 1);
            console.log("removed.");
          }
          div.remove();
        });
        const part2=document.createElement("div");
        part2.classList.add("part2");
        const author=document.createElement("p");
        author.textContent="By "+myLibrary[i].author;
        const pages = document.createElement("p");
        pages.textContent = myLibrary[i].no_of_pages + " pages";
        part2.appendChild(author);
        part2.appendChild(pages);
        
        const part3=document.createElement("div");
        part3.classList.add("part3");
        const read=document.createElement("p");
        read.textContent=myLibrary[i].isRead?"Read ✅" : "Not Read ✖️";
        read.style.cursor = "pointer";
        part3.addEventListener("click", () => {
          myLibrary[i].isRead = !myLibrary[i].isRead;
          read.textContent = myLibrary[i].isRead ? "Read ✅" : "Not Read ✖️";
        });
        part3.appendChild(read);

        div.appendChild(part1);
        div.appendChild(part2);
        div.appendChild(part3);

        main.appendChild(div);
    }

}
addBkBtn.addEventListener("click",()=>{
  dialog.showModal();
  content.classList.add("blur");
})

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  if (
    title.value.trim() === "" ||
    author.value.trim() === "" ||
    no_of_pages.value.trim() === "" 
  ) {
    alert("Please fill in all fields correctly.");
    return;
  }
  addBook(title.value.trim(),author.value.trim(),no_of_pages.value.trim());
  dialog.close();
  form.reset();
  displayBooks();
});

dialog.addEventListener("close", () => {
  content.classList.remove("blur");
});

displayBooks();
// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());

