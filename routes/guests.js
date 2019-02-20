const error = require('restify-errors');
const Guest = require('../models/Guest');
const config = require('../config');
var validator = require('validator');
const check = require('../check');

module.exports = server => {

    //Insert Guest
    server.post('/guest/', async (req, res, next) => {
        try {
            const { name, idCardNo, phone, address } = req.body;
            if(name == null) {
                return next(new error.InvalidContentError("Name must be filled"));
            }
            if(idCardNo == null) {
                return next(new error.InvalidContentError("ID Card must be filled"));
            }
            if(phone == null) {
                return next(new error.InvalidContentError("Phone must be filled"));
            }
            
            const isIdCardNo = validator.isNumeric(idCardNo);
            const isPhone = validator.isNumeric(phone);

            if (isIdCardNo == true && isPhone == true) {
                const checkGuestExist = await check.checkingGuest(idCardNo);
                const guest = new Guest({
                    name,
                    idCardNo,
                    phone,
                    address
                });

                const newGuest = await guest.save();
                res.send(201);                 
                next();
            }
            else{
                return next(new error.InvalidContentError("ID Card or Phone is not valid"));
            }
        } catch (err) {
            return next(new error.InternalError(err));
        }
    });

    //Get single user 
    server.get('/guest/:idCardNo', async (req, res, next) => {
        const guest = await Guest.findOne({ idCardNo: req.params.idCardNo })
        try {
            res.send({
                name: guest.name,
                idCardNo: guest.idCardNo,
                phone: guest.phone,
                address: guest.address == null ? "-" : guest.address
            });
            next();
        } catch (err) {
            return next(new err.ResourceNotFoundError(`There is no guest with id ${req.params.id}`));
        }
    });

    //Get All Guest
    server.get('/guest/:page/:limit', async (req, res, next) => {       
        let page = req.params.page - 1;
        let limit = parseInt(req.params.limit);
        
        try {            
            const guests = await Guest.find({})
                .skip(page * limit)
                .limit(limit)
                .exec();

            const totalData = guests.length;
            const totalPage = totalData < limit ? 1 : parseInt(totalData / limit);

            res.send({
                totalData : totalData,
                page : page + 1,
                totalPage : totalPage,
                data : guests
            });
            next();
        } catch (err) {
            return next(new err.ResourceNotFoundError(err));
        }
    });

    //Update guest 
    server.put('/guest/:idCardNo', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }
        try {
            if (req.body.idCardNo != null) {
                return next(new error.InvalidContentError("ID Card Number can not be changed"));
            }
            else {
                const guest = await Guest.findOneAndUpdate({ idCardNo: req.params.idCardNo }, req.body);
                res.send(200);
                next();
            }
        } catch (err) {
            return next(new error.ResourceNotFoundError(`There is no guest with id ${req.params.id}`));
        }
    });

    server.del('/guest/:idCardNo', async (req, res, next) => {
        try {
            const guest = await Guest.findOneAndRemove({ idCardNo: req.params.idCardNo });
            res.send(204);
            next();
        }
        catch (err) {
            return next(new error.ResourceNotFoundError(`There is no guest with id ${req.params.idCardNo}`));
        }
    });

  
};