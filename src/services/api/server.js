import {users} from './json/users.js';
import {cards} from './json/cards.js';
import {wallets} from './json/wallets.js';
import {payIns} from './json/payIns.js';
import {payOuts} from './json/payOuts.js';
import {transfers} from './json/transfers.js';



function success(result) {
    return {
        status: 'success',
        result: result
    }
}

function failure(error) {
    return {
        status: 'failure',
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

export function getUser(id) {
    let user = users.find(user => (
        user.id === id
    ));
    return user;
}

export function createUser(user) {

    const idUser = users.length + 1
    const idCard = cards.length + 1
    const idWallet = wallets.length + 1

    var newUser = {
        id: idUser.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
    };

    var newWallet = {
        id: idWallet.toString(),
        user_id: newUser.id,
        balance: 0
    };

    var newCard = {
        id: idCard.toString(),
        brand: '',
        last_four: '',
        expires_at: '',
        user_id: ''
    };

    users.push(newUser);
    cards.push(newCard);
    wallets.push(newWallet);
    return(newUser);
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
    return failure('User not found, or wrong password');
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
        return success(wallet.id).result;
    }
    else {
        return failure('Wrong email')
    }

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
export function getNewIdTransfer(){
    const idTransfer = transfers.length + 1;
    console.log(idTransfer.toString());
    return idTransfer.toString();
}

export function getTransfers(wallet_id){
    let listTransfers = transfers.filter(transfer => (
        transfer.debited_wallet_id === wallet_id || transfer.credited_wallet_id === wallet_id
    ));
    return listTransfers;
}

//----------- PAYINS & PAYOUTS -------------//

export function getNewIdPayIn(){
    const idPayIn = payIns.length + 1;
    return idPayIn.toString();
}

export function getNewIdPayOut(){
    const idPayOut = payOuts.length + 1;
    return idPayOut.toString();
}

export function addPayOut(newPayOut){
    payOuts.push(newPayOut);
}

export function addPayIn(newPayIn){
    payIns.push(newPayIn);
}

export function getPayIns(wallet_id){
    let listPayIns = payIns.filter(payIn => (
        payIn.wallet_id === wallet_id
    ));
    return listPayIns;
}

export function getPayOuts(wallet_id){
    let listPayOuts = payOuts.filter(payOut => (
        payOut.wallet_id === wallet_id
    ));
    return listPayOuts;
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
