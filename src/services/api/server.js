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

//----------- USERS -------------//

function getUserFromEmail(email) {
    let user = users.find(user => (
        user.email === email
    ));
    return user;
}

export function existingId() {

    let localUser = JSON.parse(localStorage.getItem('user_local'));

    let listId = [];

    if(localUser) {
        listId.push(localUser.id);
        for (let user of users) {
            listId.push(user.id);
        }
    } else {
        for (let user of users) {
            listId.push(user.id);
        }
    }

    localStorage.setItem('assigned_id', JSON.stringify(listId));
}

export function createId() {
    const listId = JSON.parse(localStorage.getItem('assigned_id'));
    let newId;

    if(listId === []) {
        return newId = Math.floor(Math.random() * 1000);
    } else {
        return newId = Math.max(...listId) + 1;
    }
}

export function getUser(id) {
    let user = users.find(user => (
        user.id === id
    ));
    return user;
}

export function createUser(user) {

    let wallet = {
        id: Math.floor(Math.random() * 1000),
        user_id: user.id,
        balance: 0
    };

    let card = {
        id: Math.floor(Math.random() * 1000),
        brand: '',
        last_four: '',
        expires_at: '',
        user_id: ''
    };

    users.push(user);
    cards.push(card);
    wallets.push(wallet);

    }

export function updateUser(newUser) {
    let  index = users.findIndex(user => (
        user.user_id === newUser.id
    ));

    users[index] = newUser
}

export function isEmailAvailable(email) {
    let userExist = users.find(user => (
        user.email === email
    ));

    if(userExist) {
        return false;
    }
    return true
}

export function authenticate(email, password) {
    for (let user of users) {
            if ((user.email === email) && (user.password === password)) {
                    return success(user);
                }
            }
    return failure("user not found, or wrong password");
}

//----------- WALLETS -----------//

export function getWallet(id) {
    let object = wallets.find(user => (
        user.user_id === id
    ));
    return object;
}

export function updateWallets(walletIdSender, walletIdReceiver, amount) {

    let  indexSender = wallets.findIndex(wallet => (
        wallet.id === walletIdSender
    ));

    let  indexReceiver = wallets.findIndex(wallet => (
        wallet.id === walletIdReceiver
    ));

    wallets[indexSender].balance -=  amount;
    wallets[indexReceiver].balance +=  amount;

}

export function getWalletIdFromEmail(email){
    let user = getUserFromEmail(email);
    if (user){
        let wallet = wallets.find(wallet => (
            wallet.user_id === user.id
        ));
        return success(wallet.id);
    }
    else {
        return failure('Wrong email')
    }

}

export function getWalletFromWalletId(walletId){

    var wallet = wallets.find(wallet => (
        wallet.id == walletId
    ));
    return wallet;
}

//----------- CARDS -------------//

export function updateCard(newCard) {
    let  index = cards.findIndex(card => (
        card.id === newCard.id
    ));

    cards[index]= newCard;
}

export function addCard(newCard){
    cards.push(newCard);
}

export function removeCard(cardId) {
    let index = cards.findIndex(card => (
        card.id === cardId
    ));
    cards.splice(index, 1);
}

export function getCards(id) {
    let object = cards.filter(card => (
        card.user_id === id
    ));
    return object;
}

//----------- TRANSFERS ---------//

export function addTransfert(newTransfert){
    transfers.push(newTransfert);
}

//----------- PAYINS & PAYOUTS -------------//

export function addPayOut(newPayOut){
    payOuts.push(newPayOut);
}

export function addPayIn(newPayIn){
    payIns.push(newPayIn);
}

export function withdrawalWallet(walletId, amount){
    let  index = wallets.findIndex(wallet => (
        wallet.id === walletId
    ));

    wallets[index].balance -=  amount;
}

export function depositWallet(walletId, amount){
    let  index = wallets.findIndex(wallet => (
        wallet.id === walletId
    ));

    wallets[index].balance +=  amount;
}
