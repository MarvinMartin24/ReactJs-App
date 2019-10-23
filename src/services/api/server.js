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

function getAllPayIns(){
    return payIns;
}

function getAllPayOuts(){
    return payOuts;
}

export function isEmailAvailable(email){

    const localUser = JSON.parse(localStorage.getItem('user_local'));

    if(localUser) {
        if((users.find(user => user.email === email)) || (localUser.email === email)) {
            return false;
        }
        return true
    }
    else {
        if (users.find(user => user.email === email)) {
            return false;
        }
    return true;
    }
}

export function authenticate(email, password) {

    var logCard, logWalet, emptyWalet, logTransfers, logPayIns, logPayOuts;

    const localUser = JSON.parse(localStorage.getItem('user_local'));
    const localCards = JSON.parse(localStorage.getItem('cards_local'));
    const localWallet = JSON.parse(localStorage.getItem('wallet_local'));
    const localCreditedWallet = JSON.parse(localStorage.getItem('credited_wallet'));
    const localTransfers = JSON.parse(localStorage.getItem('transfers_local'));
    const localPayIns = JSON.parse(localStorage.getItem('payIns_local'));
    const localPayOuts = JSON.parse(localStorage.getItem('payOuts_local'));

    for (let user of users) {

        // Sign up or Api
        if (localUser){

            if ((user.email === email && user.password === password) || (localUser.email === email && localUser.password === password)) {

                // LogIn from user api
                if (user.email === email && user.password === password){

                    // If cards already Modify in local storage
                    if (localCards && localCards[0].user_id === user.id){
                        logCard = Object.assign([], localCards);
                    }else{
                        // No localCards get it from dataBase
                        logCard = Object.assign([], getCard(user.id));
                    }

                    // If wallet updated in local storage
                    if (localWallet && localWallet.user_id === user.id){
                        logWalet = Object.assign({}, localWallet);


                    }else{
                        // No localwalet so create emptyWalet
                        logWalet = Object.assign({}, getWallet(user.id));
                    }

                    // If some user received money in localStorage
                    if (localCreditedWallet){
                        let index = localCreditedWallet.findIndex(wallet => wallet.user_id == user.id);

                        //if one of this user is our api User
                        if (index > -1){
                            logWalet = Object.assign({}, localCreditedWallet[index]);
                        }
                    }

                    // If transfers updated in local storage
                    if (localTransfers){
                        logTransfers = Object.assign(localTransfers);

                    }else{
                        // No localTransfers get it from dataBase
                        logTransfers = Object.assign(getAllTransfer());
                    }

                    // If payIns updated in local storage
                    if (localPayIns){
                        logPayIns = Object.assign(localPayIns);

                    }else{
                        logPayIns = Object.assign(getAllPayIns());
                    }

                    // If payOuts updated in local storage
                    if (localPayOuts){
                        logPayOuts = Object.assign(localPayOuts);
                    }else{
                        logPayOuts = Object.assign(getAllPayOuts());

                    }

                    return [success(user), logCard, logWalet, logTransfers, logPayIns, logPayOuts];
                }

                // LogIn from SignIn - LocalStorage
                else {

                    // If cards already Modify in local storage
                    if (localCards && localCards[0].user_id === localUser.id){
                         logCard = Object.assign([], localCards);
                    }else{
                        // No localCards so create emptyCard
                        var emptyCard = [];
                        logCard = Object.assign([], emptyCard);
                    }

                    // If wallet updated in local storage
                    if (localWallet && localWallet.user_id === localUser.id){

                        logWalet = Object.assign({}, localWallet);

                    }else{
                        // No localwalet so create emptyWalet
                        var emptyWalet = {id: Math.floor(Math.random() * 1000), user_id: localUser.id , balance: 0}
                        logWalet = Object.assign({}, emptyWalet);
                    }

                    // If some user received money in localStorage
                    if (localCreditedWallet){
                        let index = localCreditedWallet.findIndex(wallet => wallet.user_id == localUser.id);

                        //if one of this user is our api User
                        if (index > -1){
                            logWalet = Object.assign({}, localCreditedWallet[index]);
                        }
                    }


                    // If transfers updated in local storage
                    if (localTransfers){
                        logTransfers = Object.assign(localTransfers);

                    }else{
                        // No localTransfers get it from dataBase
                        logTransfers = Object.assign(getAllTransfer());
                    }

                    // If payIns updated in local storage
                    if (localPayIns){
                        logPayIns = Object.assign(localPayIns);

                    }else{
                        logPayIns = Object.assign(getAllPayIns());
                    }

                    // If payOuts updated in local storage
                    if (localPayOuts){
                        logPayOuts = Object.assign(localPayOuts);
                    }else{
                        logPayOuts = Object.assign(getAllPayOuts());

                    }


                    return [success(localUser), logCard, logWalet, logTransfers, logPayIns, logPayOuts];
                }
            }
        }

        // No sign Up or No localStorage
        else{
            console.log("here");
            if (user.email === email && user.password === password) {

                  return [success(user), getCard(user.id), getWallet(user.id), getAllTransfer(), getAllPayIns(), getAllPayOuts()];
            }
        }
    }
    return [failure("user not found, or wrong password")];

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
