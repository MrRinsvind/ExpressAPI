const { Movie, validate} = require('../models/movie')
const { Genre } = require('../models/genre')
const express = require('express')
const router = express.Router();

router.get('/', async(req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  console.log(1)
  let genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('Invalid genre')
  console.log(2)
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
  await movie.save()
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findById(req.body.genreId)
  if(!genre) return res.status(400).send('Invalid genre')

  const movie = await Movie.findByIdAndUpdate(req.params.id, 
    { 
      title: req.body.title,
      genre: {
        _id: genre.id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
     },{
    new: true,
  })

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async(req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id)
  
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async(req, res) => {
  const movie = await Movie.findById(req.params.id)
  
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});



module.exports = router