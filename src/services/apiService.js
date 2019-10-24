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

export function getNewIdTransfer(){
    return server.getNewIdTransfer();
}

export function getTransfers(wallet_id){
    return server.getTransfers(wallet_id);
}

//----------- PAYINS & PAYOUTS ------//

export function getNewIdPayIn(){
    return server.getNewIdPayIn();

}

export function getNewIdPayOut(){
    return server.getNewIdPayOut();
}

export function getPayIns(wallet_id){
    return server.getPayIns(wallet_id);
}

export function getPayOuts(wallet_id){
    return server.getPayOuts(wallet_id);
}

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
