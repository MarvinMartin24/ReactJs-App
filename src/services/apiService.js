import * as mock from './api/server.js';


export function isEmailAvailable(email){
    return mock.isEmailAvailable(email);
}

export function authenticate(email, password){
    return mock.authenticate(email, password);
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