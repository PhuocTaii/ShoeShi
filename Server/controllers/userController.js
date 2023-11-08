const User = require('../models/user'); 


const userController = {
    //GET all users
    getAllUsers: async (req, res) => {
        try{
            const query = { admin: false };
            const users = await User.find(query);

            if(!users){
                return res.status(500).json(err);            
            }
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //ADD user
    addUser: async (req, res) => {
        try{
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //UPDATE user
    updateUser: async (req, res) => {
        try{
            const user = await User.findByIdAndUpdate(req.params.id, req.body);
            if(!user){
                return res.status(500).json(err);            
            }
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE user
    deleteUser: async (req, res) => {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            if(!user){
                res.status(500).json(err);
            }
            res.status(200).json('The user has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    },

};
module.exports = userController;