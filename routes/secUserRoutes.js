const router = require('express').Router();
const SecUser = require('../models/SecUser');
const bcrypt = require('bcrypt');

router.get('/:userId/getsuser', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await SecUser.find({ admin: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while retrieving salaries');
    }
});

// Add new user information
router.post('/add-user', async (req, res) => {
    try {
        const { nom, prenom, admin, email, operateur_paie, operateur_donnees_paie, operateur_cnss, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new SecUser({
            nom,
            prenom,
            admin,
            email,
            operateur_paie,
            operateur_donnees_paie,
            operateur_cnss,
            password: hashedPassword
        });
        await newUser.save();

        res.status(200).json(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while adding user information');
    }
});

router.put('/suser/:suserId', async (req, res) => {
    try {
        const { suserId } = req.params;
        const { nom, prenom, admin, email, operateur_paie, operateur_donnees_paie, operateur_cnss, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await SecUser.findOneAndUpdate({ _id: suserId }, {
            nom,
            prenom,
            admin,
            email,
            operateur_paie,
            operateur_donnees_paie,
            operateur_cnss,
            password: hashedPassword
        });
        if (!user) {
            return res.status(404).send('User not found or you do not have permission to update this user');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating salarie');
    }
});

router.delete('/suser/:suserId', async (req, res) => {
    try {
        const { suserId } = req.params;

        const user = await SecUser.findOneAndDelete({ "_id": suserId });
        if (!user) {
            return res.status(404).send('user not found or already deleted');
        }

        res.status(200).send({ message: 'user deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating user');
    }
});

module.exports = router;