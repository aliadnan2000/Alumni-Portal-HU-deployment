import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";




export const signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password.toString(), existingUser.password);

        if(!isPasswordCorrect) return res.status(400),json({message: "Invalid Credentials"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});

    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
};

export const signup = async (req, res) => {
    const {email, password, firstName, lastName, batch, major} = req.body;

    try{
        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists"});
        
        const hashedPassword = await bcrypt.hash(password.toString(), 12);

        const result = await User.create({name: `${firstName.toString()} ${lastName.toString()}`, email: email.toString(), password: hashedPassword, batch: batch.toString(), major: major.toString()});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});
        
   

        res.status(200).json({result, token});
        
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }

};

export const fetchUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }

};
