const router = require('express').Router();
const User = require('../models/User');
const SecUser = require('../models/SecUser');
const bcrypt = require('bcrypt'); // biblio taamel lhashage mtaa lpassword
const Parametre = require('../models/parametre');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { societe, fullname, address, pays, tel, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User with this email already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            societe,
            fullname,
            address,
            pays,
            tel,
            email,
            password: hashedPassword,
        });


        const user = await newUser.save();


        const parameter = new Parametre({
            userId: user._id
        });

        // Save the new parameter
        await parameter.save();

        res.status(201).json('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error registering the user');
    }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ email }) || await SecUser.findOne({ email });
        if (!user) {
            return res.status(400).json('User not found');
        }

        // hedhy bech t9aren lpassword eli nty hatou m3a lpassword lcrypté fl base de données (traja3 true wila false)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        res.json(user); // idha kol chy mriguel yokhrejlek lmessage hedha
    } catch (error) { // hedhy bech ki yabda fema erreur yokhrejlek (kima cnx dh3ifa barcha wila mochkla okhra)
        console.error(error);
        res.status(500).json('Server error during login');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error during login');
    }
});

router.post('/register/:id', async (req, res) => {
    try {
        const { operateur_paie, fullname, Operateur_donnees_paie, Operateur_cnss, email, password } = req.body;
        const { id } = req.params;

        // Check if user already exists
        const existingUser = await SecUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User with this email already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new SecUser({
            admin: id,
            operateur_paie,
            fullname,
            Operateur_donnees_paie,
            Operateur_cnss,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error registering the user');
    }
});






module.exports = router;
