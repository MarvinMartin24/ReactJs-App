import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfer} from './json/transfer.js';





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

function getCard(id) {
    let object = cards.find(user => user.user_id === id);
    return object;
}

function getWallet(id) {
    let object = wallets.find(user => user.user_id === id);
    return object;
}

export function authenticate(email, password) {

    const localUser = JSON.parse(localStorage.getItem('user_local'));

    // wait few ms to be realistic
    for (let user of users) {

        if ((user.email === email && user.password === password) || (localUser.email === email && localUser.password === password)) {

            // LogIn from user api
            if (user.email === email && user.password === password){

              return [success(user), getCard(user.id), getWallet(user.id)];
            }

            // LogIn from SignIn - LocalStorage
            else {
              return success(localUser);
            }
        }
    }

    return failure("user not found, or wrong password");
}
