const mongoose = require('mongoose');

const parametreSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    cotisationCNSS_employeur: { type: Number, required: false, default: 16.57 },
    cotisationCNSS_salarie: { type: Number, required: false, default: 9.18 },
    cotisation_accident: { type: Number, required: false, default: 0.5 },
    salaire_non_imosable_limite: { type: Number, required: false, default: 400 },
    minimum_cotisationCNSS_exonere_employeur: { type: Number, required: false, default: 0.5 },
    taux_emloyeur: { type: Number, required: false, default: 2 },
    taux_salarie: { type: Number, required: false, default: 1 },
    nbr_jours_mois: { type: Number, required: false, default: 26 },
    nbr_heures_jour: { type: Number, required: false, default: 8 },
    nbr_heures_mois: { type: Number, required: false, default: 208 },
    retenue_source_expatries: { type: Number, required: false, default: 20 },
    nbr_salaries_tranche: { type: Number, required: false, default: 500 },
    premier_majoration_heures_nuit: { type: Number, required: false, default: 25 },
    deuxieme_majoration_heures_nuit: { type: Number, required: false, default: 25 },
    premier_majoration_heures_supp: { type: Number, required: false, default: 75 },
    deuxieme_majoration_heures_supp: { type: Number, required: false, default: 100 },
    troisieme_majoration_heures_supp: { type: Number, required: false, default: 25 },
    quatrieme_majoration_heures_supp: { type: Number, required: false, default: 50 },
    cinquième_majoration_heures_supp: { type: Number, required: false, default: 0 },
});

const Parametre = mongoose.model('Parametre', parametreSchema);

module.exports = Parametre;
