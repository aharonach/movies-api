import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as helpers from './helpers.js';
import * as movies from '../functions/movies.js';
import * as reviews from '../functions/reviews.js';
import * as users from '../functions/users.js';

export function load_data() {
    users.load_users();
    movies.load_movies();
    reviews.load_reviews();
}

export const router = express.Router();

router.get('/movies', (req, res) => {
    const params = helpers.query_or_body(req);
    let result;

    if ( params.random != undefined ) {
        result = movies.get_random_movies( params.random );
    } else if ( params.term ) {
        result = movies.search_movie( params.term );
    } else {
        result = movies.get_movies( params );
    }

    helpers.handle_success(res, result);
});

function create_movie(req, res) {
    try {
        const movie = movies.create_movie(req.body);
        helpers.handle_success(res, movie, StatusCodes.CREATED);
    } catch (e) {
        helpers.handle_error(res, e);
    }
}

router.post('/movies', create_movie);
router.put('/movies', create_movie);

router.get('/movie/:id', (req, res) => {
    try {
        const movie = movies.get_movie(req.params.id);
        helpers.handle_success(res, movie);
    } catch (e) {
        helpers.handle_error(res, e);
    }
});

router.delete('/movie/:id', (req, res) => {
    try {
        const movie_id = movies.delete_movie({ movie_id: req.params.id, ...req.body });
        reviews.delete_reviews(movie_id);
        helpers.handle_success(res, { success: true, movie_id: movie_id });
    } catch(e) {
        helpers.handle_error(res, e);
    }
});

router.get('/movie/:id/reviews', (req, res) => {
    try {
        const movie_reviews = reviews.get_reviews_of_movie(req.params.id);
        helpers.handle_success(res, movie_reviews);
    } catch(e) {
        helpers.handle_error(res, e);
    }
});

function create_review(req, res) {
    try {
        const review_id = reviews.create_review({ movie_id: req.params.id, ...req.body });
        helpers.handle_success(res, { success: true, review_id: review_id }, StatusCodes.CREATED);
    } catch (e) {
        helpers.handle_error(res, e);
    }
}

router.post('/movie/:id/reviews', create_review);
router.put('/movie/:id/reviews', create_review);
