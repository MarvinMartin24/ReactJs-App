import * as mock from './api/server.js';


export function isEmailAvailable(email){
    return mock.isEmailAvailable(email);
}

export function authenticate(email, password){
    return mock.authenticate(email, password);
}

export function createUser(user){
    return mock.createUser(user);
}

export function updateWallets(walletIdSender, walletIdReceiver, amount){
    return mock.updateWallets(walletIdSender, walletIdReceiver, amount);
}

export function updateCard(newCard){
    return mock.updateCard(newCard);
}

export function updateUser(newUser){
    return mock.updateUser(newUser);
}

export function addCard(newCard){
    return mock.addCard(newCard);
}

export function addTransfert(newTransfert){
    return mock.addTransfert(newTransfert);
}


export function withdrawalWallet(walletId, amount){
    return mock.withdrawalWallet(walletId, amount);
}

export function depositWallet(walletId, amount){
    return mock.depositWallet(walletId, amount);
}


export function addPayOut(newPayOut){
    return mock.addPayOut(newPayOut);
}

export function addPayIn(newPayIn){
    return mock.addPayIn(newPayIn);
}

export function removeCard(cardId){
    return mock.removeCard(cardId);
}

export function getCards(id){
    return mock.getCards(id);
}

export function getUser(id){
    return mock.getUser(id);
}

export function getWallet(id){
    return mock.getWallet(id);
}


export function getWalletIdFromEmail(email){
    return mock.getWalletIdFromEmail(email);
}
export function getWalletFromWalletId(walletId){
    return mock.getWalletFromWalletId(walletId);
}

export function existingId() {
    return mock.existingId();
}
export function createId() {
    return mock.createId();
}
