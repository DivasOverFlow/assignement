'use strict';

const express = require('express');
const router = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')
const complaint = require('./models/collection.js'); 



router.post('/signup', async (req, res, next) => {
    try {
        let user = new User(req.body);
        const userRecord = await user.save();
        const output = {
            user: userRecord,
            token: userRecord.token
        };
        res.status(201).json(output);
    } catch (e) {

        next(e.message)
    }
});

router.post('/add-admin', async (req, res, next) => {
    try {
        let user = new User(req.body);
        const userRecord = await user.save();
        const output = {
            user: userRecord,
            token: userRecord.token
        };
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
});

router.post('/signin', basicAuth, (req, res, next) => {
    const user = {
        user: req.user,
        token: req.user.token
    };
    res.status(200).json(user);
});

router.post('/newcompliant',bearerAuth,permissions('create'),async (req,res,next)=>{
    try{
        complaint.create(req.body);
        const results= await complaint.get(req.user._id)
        res.status(200).json(results);
    }catch(e){
        next(e.message);
    }
});

router.put('/statuschange/:id',bearerAuth,permissions('update'),async (req,res,next)=>{
    try{
        const id =req.params.id;
        if(req.body){
            cmplaint.update(id,req.body)
        }
        const results= await complaint.get(req.user._id)
        res.status(200).json(results);
    }catch(e){
       next(e.message);
    }
});

router.get('/getone',bearerAuth,permission('read-one'),async(req,res,next)=>{
    try{
     const id=req.user._id;
     if(id){
         const results=complaint.get(id)
        res.status(200).json(results);
     }
    }catch(e){
        next(e.message);
    }
});

router.get('/getone',bearerAuth,permission('read-all'),async(req,res,next)=>{
    try{

         const results=complaint.get()
        res.status(200).json(results);
     
    }catch(e){
        next(e.message);
    }
});



module.exports = router;