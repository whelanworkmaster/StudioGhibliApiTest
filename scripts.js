const app = document.getElementById('root');
const paginator = document.getElementById('paginator');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var requestType = 'GET'
var url = 'https://ghibliapi.herokuapp.com/films'

var request = new XMLHttpRequest();

request.open(requestType, url, true);

let data;
let index=0;
let numDisplay=4;

request.onload = function() {
    data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        displayTable(data, index);
    } else {
        console.log('error');
    }
}

const displayTable = function(data, start) {
    for(let i=start; i<start+numDisplay; i++) {
        if(i === data.length) {
            window.removeEventListener('scroll', pagination);
        }
        let movie = data[i];
        // Create a div with a card class
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        // Create an h1 and set the text context to the films title
        const h1 = document.createElement('h1');
        h1.textContent = movie.title;

        // Create a p and set the text context to the movie's description
        const p = document.createElement('p');
        movie.description = movie.description.substring(0, 300);
        p.textContent = `${movie.description}...`;

        container.appendChild(card);

        card.appendChild(h1);
        card.appendChild(p);
        
    };  
    index = index+numDisplay;
}

request.send();

const pagination = function() {
    var rect = paginator.getBoundingClientRect();
    if(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight) {
        console.log("index = " + index);
        displayTable(data, index);
    }
}

window.addEventListener('scroll', pagination);


