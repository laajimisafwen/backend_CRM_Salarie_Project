const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    societe: { type: String, required: false, default: "ss" },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    pays: { type: String, required: true },
    tel: { type: String, required: true },
    salaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salarie' }],
    email: { type: String, required: true, unique: true },
    ncnss: { type: String, required: false, default: "" },
    matricule: { type: String, required: false, default: "" },
    rcommerce: { type: String, required: false, default: "" },
    rib: { type: String, required: false, default: "" },
    assurence: { type: Boolean, required: false, default: false },
    mois13: { type: Boolean, required: false, default: true },
    cavis: { type: Boolean, required: false, default: false },
    ncavis: { type: String, required: false, default: "" },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
