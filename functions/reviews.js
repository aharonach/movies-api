import * as helpers from './helpers.js';
import * as files from './files.js';
import * as users from './users.js';
import * as movies from './movies.js';

const FILE_PATH = 'data/reviews.json';
const g_reviews = [];

/**
 * Load users from a file.
 */
export function load_reviews() {
    files.load(FILE_PATH)
        .then((data) => {
            const reviews = JSON.parse(data);
            g_reviews.length = 0;
            reviews.forEach(element => {
                g_reviews.push(element);
            });
        });
}

export function get_reviews_of_movie( movie_id ) {
    return helpers.filter_array_by(g_reviews, 'movie_id', movie_id)
        .map(review => {
            const user = users.get_user_by('id', review.user_id);
            return Object.assign({}, {...review, display_name: user.display_name});
        });
}

export function save_reviews() {
    files.save(FILE_PATH, JSON.stringify(g_reviews)).catch(err => { });
}

export function create_review(fields) {
    const { movie_id, text, rating, email, display_name } = fields;
    const movie = movies.get_movie(movie_id);
    let user = users.get_user_by('email', email);

    if (user == undefined && email == undefined) {
        throw new Error('User not found. please provide an email address and a display name.');
    }

    if (user == undefined && email != undefined) {
        user = users.create_user({ email: email, display_name: display_name });
    }

    if (text == undefined) {
        throw new Error('Review text is empty.');
    }

    if (text.length > 1000) {
        throw new Error('Review text is too long (max chars should be 1000).');
    }

    if (rating == undefined) {
        throw new Error('Review rating is empty.');
    }

    const rating_num = parseInt(rating);

    if (rating_num > 5 || rating_num < 1) {
        throw new Error('Review rating is invalid (should be 1 to 5).');
    }

    const review = {
        movie_id: movie.id,
        user_id: user.id,
        text: text,
        rating: rating_num,
    }

    g_reviews.push(review);
    save_reviews();

    return review.id;
}

export function delete_reviews( movie_id ) {
    const reviews_to_keep = g_reviews.filter( review => review.movie_id != movie_id );
    g_reviews.length = 0; // clear array
    reviews_to_keep.forEach( review => g_reviews.push(review) );
    save_reviews();
}