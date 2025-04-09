const User=require('../models/User.model');
const jwt = require('jsonwebtoken');




exports.home=(req,res)=>{
    res.send('home');
}


exports.signup=async(req,res)=>{
            //first find user if already exist return error
    const {name,email,password}=req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user=await User.findOne({email}); 
        if(user){
            return res.status(400).json({message:'User already exists'});
        }
        //create new user       
        const newUser=await User.create({name,email,password});

        res.status(201).json({
            message:'User created successfully',
            
        });
    } catch (error) {
        return res.status(500).json({message:'Internal server error'});
    }
    
}


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password matches
       user.comparePassword(password, async (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        });

        // Generate JWT token
        const token = user.generateAuthToken();

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

