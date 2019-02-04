const app = document.getElementById('root');

var requestType = 'GET'
var url = 'https://ghibliapi.herokuapp.com/films'

var request = new XMLHttpRequest();

request.open(requestType, url, true);

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            console.log(movie.title);
          });
    } else {
        console.log('error');
    }
}

request.send();

