
// create route function that handles the page charnge event
const route = (event) => {
    event = event || window.event;
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    handleLocation();

}

// set of routes that we can are available
const routes = {
    '/vercel-app/': {
        templates: './templates/home.html',
        title: "",
        Desciption: ''
    },
    '/vercel-app/basket': {
        templates: './templates/basket.html',
        title: "",
        Desciption: ''
    },
    '/vercel-app/1': {
        templates: './books/1.html',
        title: "",
        Desciption: ''
    },
    '/vercel-app/2': {
        templates: './books/2.html',
        title: "",
        Desciption: ''
    }
}
const bt = document.getElementById('btn')
// this changes the location of the url 
const handleLocation = async () => {
    let path = window.location.pathname; // get path name
    if (path.length = 0 || path == '/vercel-app/index.html' || path == '/') {
        path = '/vercel-app/'
        loadData();
    
    }
    
    // sets content of the page 
    const destination = routes[path] || routes[404];
 

    const html = await fetch(destination.templates).then((data) => data.text())
    if(destination.templates === './templates/home.html'){
        loadData();
       
    }
    var main = document.querySelector('.main')
    main.innerHTML = html;

    // loads data into the basket page
    if(path == '/vercel-app/basket'){
        basketMaker();    
        }
    
}



function loadData() {
    fetch('https://upflex-book-store-api.herokuapp.com/books')
        .then((res) => res.json()).then((data) => {
            for (let i = 0; i < data.length; i++) {
                var title = data[i].title;
                var description = data[i].metaDescription;
                var coverImage = data[i].cover;
                var id = data[i].id;
                buildBookCat(title, description, coverImage, id)

            }
        })

}

// used to create the catalogs for the books
function buildBookCat(title, description, Image, id) {
    let bbb = document.getElementById('bbb')
    var div = document.createElement('div')
    div.setAttribute('class', 'book')
    var divHtml =`<a href="${id}" onclick="route()"></a`+`<h1>${title} &#8594; </h1>`+`<p>${description}`+
    `</a>`
   
    div.innerHTML = divHtml;
    bbb.appendChild(div);
   
// var shwimg = document.getElementById('shwimg');

}

const booksArray =[]
 var counter = 0;

/**
 * this function is what adds items to the basket it has
 * no parameters
 * it adds books to an array only whent the book has not been inserted
 * or pushed to the array before am coding at 2:46AM  am starving so if
 * my english is messed up not my fault
 * 
 */
var lid =booksArray.length;
var c = document.getElementById('counter')
function BasketControls(){
counter ++;
c.textContent = 'item(s): '+counter;
let title = document.querySelector('.titles').innerHTML;

for(let i = 0; i<booksArray.length; i++){
    if(booksArray[i].title==title){
booksArray[i].quantity += 1;
        return;
    }
}
booksArray.push({'id':lid,'title':title,quantity:1});
lid += 1;
}

/**so this function loops through the array and draws containers 
 * for books it also increments the number of times a book has been bought
 * it also has a remove buttton that triggers a remove funciton that not only
 * deletes the div but also shifts that is removes it from the booksArray entirely
 * ok lets begin :)
 * 
 */
function basketMaker(){
    // get elements needeed
    let btn =  document.querySelector('.btn')
    let container = document.querySelector('.container')
if(counter > 0){
btn.textContent ='basket summary';

for(let i =0; i<booksArray.length; i++){
let shopCon = document.createElement('div')
    shopCon.setAttribute('class','shopCon')
    shopCon.setAttribute('data-name',booksArray[i].id)
    let actshopCon = document.createElement('div')
    let controls = document.createElement('div')
    actshopCon.setAttribute('class','actshopCon')
let shop = document.createElement('div');
let times = document.createElement('h1');
times.setAttribute('class','bigText')
times.setAttribute('data-times',booksArray[i].title)
shop.setAttribute('class','shop');
shop.textContent = booksArray[i].title;
times.textContent = 'X'+booksArray[i].quantity;
container.appendChild(shopCon)
shopCon.appendChild(actshopCon)
actshopCon.append(shop)
let buttonss = document.createElement('button')
buttonss.textContent ='Remove'
buttonss.setAttribute('data-name',booksArray[i].id)
shopCon.appendChild(controls)
controls.appendChild(times)
controls.setAttribute('class','controls');
buttonss.setAttribute('class','buttonss')
controls.appendChild(buttonss)
buttonss.addEventListener('click',remove,true)

if(booksArray[i].quantity == 0){
shopCon.style='display:none'
    }
}
let filterArray = (num) =>{
    return num.quantity > 0;
}
let buttons = document.createElement('button')
buttons.textContent='pay';
buttons.addEventListener('click',()=>{
let a = booksArray.filter(filterArray);
console.log(a)
}

,true)
document.querySelector('.container').appendChild(buttons)
}
else{
   container.innerHTML ='<a class="link" href="/" onclick="route()"> < Go Back </a> <h4 class="btn">Basket is empty</h4>'
}
}



// this is my very last function 
// it removes an object from th array list
function remove(e){

let id = e.target.getAttribute('data-name')
const times = document.querySelectorAll('.bigText')

   if(counter == 0){
    counter += 0;
   } 
    else{
        counter -= 1;
        c.textContent = 'item(s):'+counter; 
    
for(let i=0; i<times.length; i++){
    const signleTimes = times[i].getAttribute('data-times')
   
    if(booksArray[id].title === signleTimes){
          booksArray[id].quantity -= 1;
      times[i].textContent ='X'+   booksArray[id].quantity;
        
    }
}
    }


if(   booksArray[id].quantity == 0){
    booksArray[id].quantity += 0;
    counter += 0;
    var dvc = document.querySelectorAll('.shopCon')
for(let i =0; i<dvc.length; i++){
    if(dvc[i].getAttribute('data-name') == booksArray[id].id){
        dvc[i].style ='display:none;'
    }


}


if(counter == 0){
    counter += 0;
c.textContent ='empty';
    basketMaker();
}

}


}


// this just handles the use of the left and right navigation arrows on
//the page am also supposed to be using multiline comments here but
//hunger :(
window.onpopstate = handleLocation;
window.route = route;
handleLocation();