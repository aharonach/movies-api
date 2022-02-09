import * as crypto from 'crypto';

export function generate_new_id(arr) {
    let max_id = 0;
    arr.forEach(item => { max_id = Math.max(max_id, item.id) });
    return max_id + 1;
}

export function generate_random_string() {
    return crypto.randomBytes(30).toString('base64');
}

export function filter_array_by(arr, field, value) {
    return arr.filter(item => item[field] == value);
}

export function find_array_by(arr, field, value) {
    return arr.find(item => item[field] == value);
}

export function find_array_index_by(arr, field, value) {
    return arr.findIndex(item => item[field] == value);
}

export function sort_by(property, order = 'asc') {
    let sortOrder = order == 'asc' ? 1 : -1;
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}