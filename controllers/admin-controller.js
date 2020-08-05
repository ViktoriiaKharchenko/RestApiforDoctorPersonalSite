//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/app');
const Admin = require('../models/admin-model');



const getAdmins = async (req, res) => {
    await Admin.find({}, (err, Admins) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Admins.length) {
            return res
                .status(404)
                .json({ success: false, error: `Admin not found` })
        }
        return res.status(200).json({ success: true, data: Admins })
    }).catch(err => console.log(err))
}

const signIn = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({email})
        .exec()
        .then((admin)=>
        {
            if(!admin){
                return  res.status(401).json({massage: 'Admin does not exist'});
            }
            else{
            const isValid = bcrypt.compareSync(password,admin.password);
            if(isValid){

                const token = jwt.sign({_id : admin._id.toString()},jwtSecret);
                 return res.status(201).json({
                    success: true,
                    token: token.toString()});

            }
            else {
                return res.status(401).json({message: 'Invalid password'});
            }}
        })
      .catch(err=>
          res.status(500).json({message:err.message}))
};
const checkToken = (req, res) => {
    Admin.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });



}

const createAdmin = (req, res) => {
    const body = req.body;
    body.password = bcrypt.hashSync(req.body.password,10);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Admin',
        })
    }

    var admin = new Admin(body)

    if (!admin) {
        return res.status(400).json({ success: false, error: err })
    }

    admin
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: admin._id,
                message: 'Admin created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Admin not created!',
            })
        })
}

module.exports = {
    signIn,
    getAdmins,
    createAdmin,
    checkToken


}

