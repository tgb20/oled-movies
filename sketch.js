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
    return movies.slice(0, 10).concat(movies.slice(0, 10));
    }

    let posX = 0;

    window.onload = async () => {
    let movies = await fetchMovies();
    let body = document.getElementById("body");
    movies.forEach(movie => {
        const img = document.createElement("img");
        img.src = movie.poster;
        body.appendChild(img);
    });

    setInterval(() => {
        window.scrollTo(posX, 0);
        posX += 2;
        if (window.scrollX >= 12480) {
        window.scrollTo(0, 0);
        posX = 0;
        }
    }, 10);
}