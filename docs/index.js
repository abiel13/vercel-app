
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
        console.log(path)
    }
    
    // sets content of the page 
    const destination = routes[path] || routes[404];
    console.log(path)

    const html = await fetch(destination.templates).then((data) => data.text())
    if(destination.templates === './templates/home.html'){
        loadData();
        console.log('you bro')
    }
    var main = document.querySelector('.main')
    main.innerHTML = html;

    // loads data into the basket page
    if(path == '/vercel-app/basket'){
        basketMaker();    
        }
    
}



// get books from api and write to page
function loadData() {
    fetch('https://upflex-book-store-api.herokuapp.com/books')
        .then((res) => res.json()).then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i])
                console.log(data[i].title)
                console.log(data[i].id)
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
    console.log(div)

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
var lid =0;
var c = document.getElementById('counter')
function BasketControls(){
counter ++;

c.textContent = 'item(s): '+counter;
let title = document.querySelector('.titles').innerHTML;

for(let i = 0; i<booksArray.length; i++){
    if(booksArray[i].title==title){
booksArray[i].quantity += 1;
        console.log('you put an item that already exists times 2 then')
        return;
    }
}
booksArray.push({'id':lid,'title':title,quantity:1});
lid++;
console.log(booksArray);
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
}
for(let i =0; i<booksArray.length; i++){
console.log(booksArray.length)
    let shopCon = document.createElement('div')

    shopCon.setAttribute('class','shopCon')

    let buttons = document.createElement('button')

    buttons.textContent='pay';
buttons.addEventListener('click',()=>{console.log(booksArray)},true)
    let actshopCon = document.createElement('div')

    let controls = document.createElement('div')

    actshopCon.setAttribute('class','actshopCon')
let shop = document.createElement('div');
let times = document.createElement('h1');
times.setAttribute('class','bigText')
shop.setAttribute('class','shop');
shop.textContent = booksArray[i].title;
times.textContent = 'X'+booksArray[i].quantity;
container.appendChild(shopCon)
shopCon.appendChild(actshopCon)
actshopCon.append(shop)
actshopCon.appendChild(buttons);
let buttonss = document.createElement('button')
buttonss.textContent ='Remove'
buttonss.setAttribute('data-name',booksArray[i].id)
shopCon.appendChild(controls)
controls.appendChild(times)
controls.setAttribute('class','controls');
buttonss.setAttribute('class','buttonss')
controls.appendChild(buttonss)



buttonss.addEventListener('click',remove,true)
}

}


// this is my very last function 
// it removes an object from th array list
function remove(e){
    var id = e.target.getAttribute('data-name')
counter -= 1;
booksArray[id].quantity -= 1;
console.log(counter)
console.log(booksArray[id].quantity)

document.querySelector('.bigText').textContent ='X '+ booksArray[id].quantity;
c.textContent = 'item(s):'+counter;
if(booksArray[id].quantity <= 0){
    booksArray.splice(id,1);
console.log(booksArray)

}
}





// this just handles the use of the left and right navigation arrows on
//the page am also supposed to be using multiline comments here but
//hunger :(
window.onpopstate = handleLocation;
window.route = route;
handleLocation();