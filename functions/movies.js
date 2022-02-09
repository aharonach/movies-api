import * as helpers from './helpers.js';
import * as files from './files.js';
import * as users from './users.js';

const FILE_PATH = 'data/movies.json';
const g_movies = [];

/**
 * Load users from a file.
 */
export function load_movies() {
    files.load(FILE_PATH)
        .then((data) => {
            const movies = JSON.parse(data);
            g_movies.length = 0;
            movies.forEach(element => {
                g_movies.push(element);
            });
        });
}

export function save_movies() {
    files.save(FILE_PATH, JSON.stringify(g_movies)).catch(err => { });
}

export function get_movie(id) {
    const movie = helpers.find_array_by(g_movies, 'id', id);
    
    if ( movie == undefined ) {
        throw new Error('Movie not found.');
    }

    return Object.assign({}, { id: movie.id, name: movie.name, image_url: movie.image_url, creator: movie.creator });
}

export function get_movies(filters) {
    return filter_movies(filters).map(movie => Object.assign({}, {
        id: movie.id,
        name: movie.name,
        creator: movie.creator,
        image_url: movie.image_url,
    }));
}

export function create_movie(fields) {
    const { name, image_url, email, display_name } = fields;

    let user = users.get_user_by('email', email);

    if (user == undefined && email == undefined) {
        throw new Error('User not found. please provide an email address and a display name.');
    }

    if (user == undefined && email != undefined) {
        user = users.create_user({ email: email, display_name: display_name });
    }

    if (name == undefined || name == '') {
        throw new Error('Movie name is empty.');
    }

    if (image_url == undefined) {
        throw new Error('Movie image url is empty.');
    }

    if (!validate_url(image_url)) {
        throw new Error('Movie image url is invalid.');
    }

    const movie = {
        id: helpers.generate_new_id(g_movies),
        name: name,
        image_url: image_url,
        creator: user.id,
        secret_data: helpers.generate_random_string(),
    }

    g_movies.push(movie);
    save_movies();

    return Object.assign({}, movie);
}

export function delete_movie(fields) {
    const { movie_id, secret_data } = fields;

    const index = helpers.find_array_index_by(g_movies, 'id', movie_id);

    if (index < 0) {
        throw new Error('Movie not found.');
    }

    const movie = g_movies[index];

    if ( movie.secret_data == secret_data ) {
        g_movies.splice(index, 1);
        save_movies();
        return movie_id;
    }

    throw new Error('Secret data is wrong.');
}

export function search_movie(term) {
    if ( typeof(term) == 'string' ) {
        const term_lower = term?.toLowerCase();

        if ( term_lower ) {
            return g_movies
                .filter(movie => movie.name.toLowerCase().includes(term_lower))
                .map(movie => Object.assign({}, { id: movie.id, name: movie.name, image_url: movie.image_url, creator: movie.creator }));
        }
    }

    return [];
}

export function get_random_movies(limit) {
    let limit_clean = parseInt(limit);

    if ( isNaN( limit_clean ) || limit_clean < 1 ) {
        limit_clean = 3;
    }

    return g_movies.sort(() => .5 - Math.random()).slice(0, parseInt(limit_clean));
}

function filter_movies(filters) {
    const { orderby, order, limit } = filters;
    let filtered = [...g_movies];

    switch (orderby?.toLowerCase()) {
        case 'name':
            filtered.sort(helpers.sort_by('name', order));
            break;

        case 'id':
        default:
            filtered.sort(helpers.sort_by('id', order));
            break;
    }

    filtered.length = Math.min(filtered.length, limit !== undefined ? parseInt(limit) : 20);

    return filtered;
}

function validate_url(url) {
    return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
}