import * as helpers from './helpers.js';
import * as files from './files.js';

const FILE_PATH = 'data/users.json';
const g_users = [];

/**
 * Load users from a file.
 */
export function load_users() {
    files.load(FILE_PATH)
        .then((data) => {
            const users = JSON.parse(data);
            g_users.length = 0;
            users.forEach(element => {
                g_users.push(element);
            });
        });
}

/**
 * Save all users back to a file.
 */
export function save_users() {
    files.save(FILE_PATH, JSON.stringify(g_users)).catch(err => console.log(err));
}

export function get_user_by(field, value) {
    return helpers.find_array_by(g_users, field, value);
}

export function get_users() {
    return g_users;
}

export function create_user(args) {
    const { email, display_name } = args;
    let display_name_new = display_name;

    if (email == undefined) {
        throw new Error('Email is missing');
    }

    const clean_email = email_clean(email);

    if (!email_validate(clean_email)) {
        throw new Error('Email is not a valid email address');
    }

    if (email_exists(clean_email)) {
        throw new Error('Email already exists');
    }

    if (display_name_new == undefined || display_name_new == '') {
        display_name_new = email;
    }

    const user = {
        id: helpers.generate_new_id(g_users),
        display_name: display_name_new,
        email: clean_email
    }

    g_users.push(user);
    save_users();

    return user;
}

function email_clean(email) {
    return email.trim().toLowerCase();
}

function email_exists(email) {
    return helpers.find_array_by(g_users, 'email', email) !== undefined;
}

function email_validate(email) {
    return /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(email);
}