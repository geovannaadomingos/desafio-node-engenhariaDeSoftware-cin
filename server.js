const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let movies = [
    { id: 1, title: 'A Baleia', director: 'Darren Aronofsky' },
    { id: 2, title: 'John Wick', director: 'Chad Stahelski' },
];


app.get('/movies', (_request, response) => {
    response.json(movies);
});

app.get('/movies/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const movie = movies.find(movie => movie.id === id);

    if (movie) {
        response.json(movie);
    } else {
        response.status(404).json({ message: 'Filme não encontrado.' });
    }
});


app.post('/movies', (request, response) => {
    const newMovie = request.body;
    newMovie.id = movies.length + 1;
    movies.push(newMovie);
    response.status(201).json(newMovie);
});


app.put('/movies/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedMovie = request.body;

    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies[index] = { id, ...updatedMovie };
        response.json(movies[index]);
    } else {
        response.status(404).json({ message: 'Filme não encontrado.' });
    }
});


app.patch('/movies/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const updatedFields = request.body;

    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies[index] = { ...movies[index], ...updatedFields };
        response.json(movies[index]);
    } else {
        response.status(404).json({ message: 'Filme não encontrado.' });
    }
});


app.delete('/movies/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const index = movies.findIndex(movie => movie.id === id);

    if (index !== -1) {
        movies.splice(index, 1);
        response.json({ message: 'Filme removido com sucesso.' });
    } else {
        response.status(404).json({ message: 'Filme não encontrado.' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
