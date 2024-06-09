const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // biblio taamel lhashage mtaa lpassword

router.put('/update-profile', async (req, res) => {
    try {
        const { email, updates } = req.body; 

        const user = await User.findOneAndUpdate({ email: email }, updates, { new: true }); 
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({ user, message: 'Profile updated successfully' }); 
    } catch (error) { 
        console.error(error);
        res.status(500).send('Error updating profile');
    }
});

router.put('/update-password', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send('Password updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating password');
    }
});


module.exports = router;