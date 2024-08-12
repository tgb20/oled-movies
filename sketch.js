async function fetchMovies() {
    let response = await fetch('https://flowers.tgb.gg/movies');
    let json = await response.json();
    movies = _.chain(json)
        .map(function (movie) {
            movie.year = parseInt(movie.year);
            movie.genres = movie.genres.split(', ');
            movie.rating = parseFloat(movie.rating);
            movie.votes = parseInt(movie.votes.replace(/\,/g, ''));

            return movie;
        }).sortBy(function (movie) {
            let date = new Date(movie.watched);
            return -date.getTime();
        }).value();
    return movies.slice(0, 10);
}

let posX = 0;
let movies = [];
let posters = [];
let posterWidth = 480;
let posterHeight = 720;
async function setup() {
    createCanvas(1280, 720);
    movies = await fetchMovies();
    for (let i = 0; i < movies.length; i++) {
        let mp = loadImage('https://cors-proxy.tgb20.workers.dev/?' + movies[i].poster);
        let newImage = new ImageContainer(mp, i * posterWidth, 0);
        posters.push(newImage);
    }
}

let offset = 0;
let speed = 3;

function draw() {
    for (let i = 0; i < posters.length; i++) {
        posters[i].update();
        posters[i].draw()
    }
    offset += speed;
}

class ImageContainer {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }

    draw() {
        image(this.image, this.x, this.y, posterWidth, posterHeight);
    }

    update() {
        this.x -= speed;
        if (this.x < -posterWidth) {
            this.x = (posters.length - 1) * posterWidth;
        }
    }
}