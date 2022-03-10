const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//since the API returns a promise we can use async!
//different syntax than promise and await!!
app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', { beers });
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  const randBeer = randomBeer[0];
  res.render('random-beer', { randBeer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// PROMISE VERSION
/* 
app.get('/random-beer', (req, res) => {
  //const punkAPI2 = new PunkAPIWrapper();
  const randomBeer = punkAPI.getRandom();
  randomBeer
  // .then is the response sending...therefore res.render INSIDE the then block
    .then(beer => {
      const randBeer = beer[0];
      res.render('random-beer', {randBeer});
    })
    .catch(error => console.log(error));
}); */
