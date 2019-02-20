const mongoose = require('mongoose');
const Guest = mongoose.model('Guest');

exports.checkingGuest = (idCardNo) => {
    return new Promise(async(resolve, reject) => {
        try{
            //Get user by email
            const guestByIDCard = await Guest.find({idCardNo : idCardNo});
            
            if(guestByIDCard.length == 0){
                resolve(true);
            }
            else{
                reject("Guest already registered");
            }
        }catch(err){
            reject("Guest already registered");
        }
    });
};