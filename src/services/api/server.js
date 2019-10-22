import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfers} from './json/transfers.js';





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

function getUser(email) {
    let user = users.find(user => user.email === email);
    return user;
}

function getCard(id) {
    let object = cards.filter(user => user.user_id === id);
    return object;
}

function getWallet(id) {
    let object = wallets.find(user => user.user_id === id);
    return object;
}

function getAllTransfer(){
    return transfers;
}

export function isEmailAvailable(email){
    if (users.find(user => user.email === email))
        return false;
    return true;
}

export function authenticate(email, password) {

    const localUser = JSON.parse(localStorage.getItem('user_local'));

    // wait few ms to be realistic
    for (let user of users) {
        // Sign up or Api
        if (localUser){

            if ((user.email === email && user.password === password) || (localUser.email === email && localUser.password === password)) {

                // LogIn from user api
                if (user.email === email && user.password === password){

                  return [success(user), getCard(user.id), getWallet(user.id), getAllTransfer()];
                }

                // LogIn from SignIn - LocalStorage
                else {
                    var emptyCard = {user_id: localUser.id , id: Math.floor(Math.random() * 1000) , last_4:'' , brand:'' , expired_at: ''};
                    var emptyWalet = {id: Math.floor(Math.random() * 1000), user_id: localUser.id , balance: 0}
                    return [success(localUser), emptyCard, emptyWalet, getAllTransfer()];
                }
            }
            return [failure("user not found, or wrong password")];
        }

        // No sign Up
        else{
            if (user.email === email && user.password === password) {

                  return [success(user), getCard(user.id), getWallet(user.id), getAllTransfer()];
            }
            return [failure("user not found, or wrong password")];
        }
    }
}

export function getWalletIdFromEmail(email){
    let user = getUser(email);
    if (user){
        let wallet = wallets.find(wallet => wallet.user_id === user.id);
        return success(wallet.id);
    }
    else {
        return failure('Wrong email')
    }

}

export function getWalletFromWalletId(walletId){

    var wallet = wallets.find(wallet => wallet.id == walletId);
    return wallet;
}
