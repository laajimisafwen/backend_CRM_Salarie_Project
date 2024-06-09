const mongoose = require('mongoose');

const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let fullDate = `${day}/${month}/${year}`;

const salarieSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: String, required: true },
    address: { type: String, required: false, default: "" },
    tel: { type: String, required: false, default: "" },
    cnss: { type: String, required: false, default: "" },
    codeAnalytique: { type: String, required: false, default: "" },
    dateNaissance: { type: String, required: false, default: "" },
    rib: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    matricule: { type: String, required: true, default: "" },
    chef_famille: { type: Boolean, required: false, default: true },
    parent_charge: { type: Boolean, required: false, default: false },
    enfant1: { type: Boolean, required: false, default: false },
    enfant2: { type: Boolean, required: false, default: false },
    fonction: { type: String, required: false, default: "" },
    categorie: { type: String, required: false, default: "" },
    echelon: { type: String, required: false, default: "" },
    date_contrat: { type: Date, required: false, default: "" },
    regime: { type: String, required: false, default: "Ordinaire" },
    payment_mode: { type: String, required: false, default: "Virement bancaire" },
    mois13: { type: Boolean, required: false, default: true },
    salaire_mensuel: { type: String, required: false, default: "1000" },
    prime_presence: { type: String, required: false, default: null },
    prime_transport: { type: String, required: false, default: null },
    jours_absence: { type: String, required: false, default: "" },
    jours_congé: { type: String, required: false, default: "" },
    jours_feries: { type: String, required: false, default: "" },
    heures_sup_1: { type: String, required: false, default: "" },
    heures_sup_2: { type: String, required: false, default: "" },
    heures_sup_3: { type: String, required: false, default: "" },
    heures_sup_4: { type: String, required: false, default: "" },
    heures_sup_5: { type: String, required: false, default: "" },
    nbr_tickets: { type: String, required: false, default: "" },
    avances: { type: String, required: false, default: "" },
    prets: { type: String, required: false, default: "" },
    date: { type: String, required: false, default: fullDate },
});

const Salarie = mongoose.model('Salarie', salarieSchema);

module.exports = Salarie;
