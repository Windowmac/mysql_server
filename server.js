const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Sk3l3tal0ne',
      database: 'movie_db'
    },
    console.log(`Connected to the movies database.`)
  );

app.get('/api/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if(err){
            throw new Error(err);
        } else {
            res.json(results);
        }
    })
});

app.post('/api/add-movie', (req, res) => {
    console.log('body is: ' + JSON.stringify(req.body));
    db.query(`INSERT INTO movies (movie_name) VALUES ("${req.body.movie_name}")`, (err, results) => {
        if(err){
            throw new Error(err);
        } else {
            res.json('successfully added movie to db');
        }
    })
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});