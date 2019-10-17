import * as mock from './api/server.js';

export function authenticate(email, password){
    return mock.authenticate(email, password);
}

export function getUser(id){
    return mock.getUser(id);
}
