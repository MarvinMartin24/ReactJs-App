import {users} from './json/users.js';
import {cards} from './json/cards.js';



function success(result) {
    return {
        status: "success",
        result: result
    }
}

function failure(error) {
    return {
        status: "failure",
        error: error

    }
}

export function authenticate(email, password) {

    const localUser = JSON.parse(localStorage.getItem('user_local'));

    // wait few ms to be realistic
    for (let user of users) {

        if ((user.email === email && user.password === password) || (localUser.email === email && localUser.password === password)) {

            // LogIn from user api
            if (user.email === email && user.password === password){
              return success(user);
            }

            // LogIn from SignIn - LocalStorage
            else {
              return success(localUser);
            }
        }
    }

    return failure("user not found, or wrong password");
}

export function getCard(id) {
    let object = cards.find(user => user.user_id === id);
    return object;
}
