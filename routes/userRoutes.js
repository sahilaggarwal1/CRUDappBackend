const User = require('../model/userModels');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ err: 'Failed to fetch the user Data', message: err });
    }
});

router.post('/', async (req, res) => {
    const { name, email, description } = req.body;
    try {
        const newUser = new User({ name, email, description });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ err: 'Failed to Save the user Data', message: err });
    }
});

router.put('/:id', async (req, res) => {
    const { name, email, description } = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, description },
            { new: true }
        );
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ err: 'Failed to Update the user Data', message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted', user: deletedUser });
    } catch (err) {
        res.status(500).json({ err: 'Failed to Delete the user Data', message: err });
    }
});

module.exports = router;