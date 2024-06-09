const mongoose = require('mongoose');

const secUserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    admin: { type: String, required: true },
    email: { type: String, required: true },
    operateur_paie: { type: Boolean, required: false, default: false },
    operateur_donnees_paie: { type: Boolean, required: false, default: false },
    operateur_cnss: { type: Boolean, required: false, default: false },
    password: { type: String, required: true },
});

const SecUser = mongoose.model('SecUser', secUserSchema);

module.exports = SecUser;
