const router = require('express').Router();
const Parametre = require('../models/parametre');


router.get('/parametres/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const parametre = await Parametre.findOne({ userId });

        if (!parametre) {
            return res.status(404).send('Parameters not found');
        }

        res.status(200).json(parametre);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while retrieving parameters');
    }
});


router.put('/parametres/:parametreId', async (req, res) => {
    try {
        const { parametreId } = req.params;
        const updates = req.body;

        const parametre = await Parametre.findByIdAndUpdate(parametreId, updates, { new: true });

        if (!parametre) {
            return res.status(404).send('Parameters not found');
        }

        res.status(200).json({ message: 'Parameters updated successfully', parametre });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating parameters');
    }
});


module.exports = router;