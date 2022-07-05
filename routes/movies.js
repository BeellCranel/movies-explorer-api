const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { valPostMovie, valDeleteMovie } = require('../middlewares/validator');

router.post('/movies', valPostMovie, postMovie);
router.get('/movies', getMovies);
router.delete('/movies/:_id', valDeleteMovie, deleteMovie);

module.exports = router;
