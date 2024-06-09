const mongoose = require("mongoose");


const dbConnexion = () => {
    mongoose
        .connect(
            "mongodb+srv://admin:Fggqi6w9d6elC515@cluster0.gnexbo5.mongodb.net/Paie", // hedha lien mtaa lbase de données mte3k
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => console.log("Database connected")) // hedha message ybenlek ki tconnecti bl base de données mn ghyr hata machekel
        .catch((err) => console.log(err)); // hedha message fi souret mee sar erreur fl connection bl base de données
};

module.exports = dbConnexion;

// Fggqi6w9d6elC515