const router = require('express').Router();
const User = require('../models/User');
const Salarie = require('../models/Salarie');


router.get('/:userId/getsalaries', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('salaries');
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user.salaries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while retrieving salaries');
    }
});

// hedhy bech tjiib salariee wehed 
router.get('/getsalaries/:salarieId', async (req, res) => {
    try {
        const { salarieId } = req.params;
        const salarie = await Salarie.findById(salarieId);
        if (!salarie) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(salarie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while retrieving salaries');
    }
});

router.post('/:userId/salaries', async (req, res) => {
    try {
        const { userId } = req.params;
        const { matricule } = req.body;

        if (!matricule) {
            return res.status(400).send('Matricule not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Use a regex to search for salaries where the matricule contains the provided text.
        // The 'i' option makes the search case-insensitive.
        const regex = new RegExp(matricule, 'i');
        const salarie = await Salarie.find({ matricule: { $regex: regex } });

        if (!salarie) {
            return res.status(404).send('Salarie with the provided matricule not found');
        }

        res.status(200).json(salarie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while retrieving salaries');
    }
});


router.put('/salaries/:salarieId', async (req, res) => {
    try {
        const { salarieId } = req.params;
        const updates = req.body;

        const salarie = await Salarie.findOneAndUpdate({ _id: salarieId }, updates);
        if (!salarie) {
            return res.status(404).send('Salarie not found or you do not have permission to update this salarie');
        }

        res.status(200).json({ salarie, message: 'Salarie updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating salarie');
    }
});


router.delete('/:userId/salaries/:salarieId', async (req, res) => {
    try {
        const { userId, salarieId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.salaries.pull(salarieId);
        await user.save();

        const salarie = await Salarie.findOneAndDelete({ "_id": salarieId });
        if (!salarie) {
            return res.status(404).send('Salarie not found or already deleted');
        }

        res.status(200).send({ message: 'Salarie deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while updating salarie');
    }
});


// Add salary information
router.post('/:userId/add-salarie', async (req, res) => {
    try {
        const { userId } = req.params;
        const salarieData = req.body;

        const newSalarie = new Salarie(salarieData);
        const salarie = await newSalarie.save();


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.salaries.push(salarie._id);
        await user.save();

        res.status(201).send({ user, salarie, message: 'Salarie information added successfully to the user' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while adding salarie information');
    }
});

module.exports = router;
