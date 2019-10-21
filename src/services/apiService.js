import * as mock from './api/server.js';

export function authenticate(email, password){
    return mock.authenticate(email, password);
}
export function getWalletIdFromEmail(email){
    return mock.getWalletIdFromEmail(email);
}
export function getWalletFromWalletId(walletId){
    return mock.getWalletFromWalletId(walletId);
}
