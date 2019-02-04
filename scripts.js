const app = document.getElementById('root');

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

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
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
        });
    } else {
        console.log('error');
    }
}

request.send();

