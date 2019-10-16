import {users} from './json/users.js';

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
    // wait few ms to be realistic
    const localEmail = localStorage.getItem('signIn_email');
    const localPassword = localStorage.getItem('signIn_password');

    for (let user of users) {

        if ((user.email === email && user.password === password) || (localEmail === email && localPassword === password)) {

            // LogIn from user api
            if (user.email === email && user.password === password){
              return success(user);
            }

            // LogIn from SignIn - LocalStorage
            else {
              return success(localEmail); // To be modified
            }
        }
    }

    return failure("user not found, or wrong password");
}
