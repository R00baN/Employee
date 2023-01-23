const router = require('express').Router()
const secret = process.env.SECRET
const refresh_token = process.env.REFRESHTOKEN
const { compareSync, hashSync } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
const User = require('../models/userModel')

// Register as an admin
router.post('/', async(req, res) => {
    try {
        let user_n = await User.find({email: req.body.email}).select('email')
        
        if(user_n.length == 0){
        const user = new User ({
            email: req.body.email,
            password: hashSync(req.body.password, 10),
            title: req.body.title,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
        })
        // let user_details = {
        //     email: req.body.email,
        //     _id: user._id
        // }
        user.save()
        const token = sign({user: {userId: user.id}}, secret, { expiresIn: '1d'})
        const refreshToken = sign({userId: user.id}, refresh_token, { expiresIn: '100y'})
        res.json({
            user: user, 
            success: true, 
            token, 
            refreshToken,
            message: `User created successfully`
        })
    }else{
        res.json({
            success: false, 
            message: `Email already exist`
        })
    }
    }catch(err){
        res.json({success: false, error: err.message})
    }
})

// Get all the users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        const totalCount = await User.count()
        res.json({
            success: true,
            users,
            totalCount
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
})

// Get user by ID

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({
            success: true,
            user
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
})

// Edit user by ID

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            )
        res.json({
            success: true,
            user
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
})

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({
            success: true,
            message: `User Deleted successfully`
        })
    } catch(err) {
        res.json({
            success: false,
            error: err.message
        })
    }
})

module.exports = router