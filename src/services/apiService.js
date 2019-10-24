import * as server from './api/server.js';



//----------- USERS -----------------//

export function isEmailAvailable(email){
    return server.isEmailAvailable(email);
}

export function authenticate(email, password){
    return server.authenticate(email, password);
}

export function createUser(user){
    return server.createUser(user);
}

export function updateUser(newUser){
    return server.updateUser(newUser);
}

export function getUser(id){
    return server.getUser(id);
}

export function existingId() {
    return server.existingId();
}

export function createId() {
    return server.createId();
}

//----------- CARDS -----------------//

export function updateCard(newCard){
    return server.updateCard(newCard);
}

export function addCard(newCard){
    return server.addCard(newCard);
}

export function removeCard(cardId){
    return server.removeCard(cardId);
}

export function getCards(id){
    return server.getCards(id);
}

//----------- WALLETS ---------------//

export function updateWallets(walletIdSender, walletIdReceiver, amount){
    return server.updateWallets(walletIdSender, walletIdReceiver, amount);
}

export function getWallet(id){
    return server.getWallet(id);
}

export function getWalletIdFromEmail(email){
    return server.getWalletIdFromEmail(email);
}


//----------- TRANSFERS -------------//

export function addTransfert(newTransfert){
    return server.addTransfert(newTransfert);
}

//----------- PAYINS & PAYOUTS ------//

export function withdrawalWallet(walletId, amount){
    return server.withdrawalWallet(walletId, amount);
}

export function depositWallet(walletId, amount){
    return server.depositWallet(walletId, amount);
}

export function addPayOut(newPayOut){
    return server.addPayOut(newPayOut);
}

export function addPayIn(newPayIn){
    return server.addPayIn(newPayIn);
}
