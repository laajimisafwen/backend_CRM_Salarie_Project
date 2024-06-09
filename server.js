const express = require('express');
const app = express();
const db = require("./db/db");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const updateRoutes = require("./routes/updateRoutes");
const salarieRoutes = require("./routes/salarieRoutes");
const parametreRoutes = require("./routes/parametreRoutes");
const secUserRoutes = require("./routes/secUserRoutes");

db();

app.use(express.json()); // bech lapplication mte3ek tefhem eli lhya tet3amel maa json
app.use(cors());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/user', updateRoutes);
app.use('/api/user', salarieRoutes);
app.use('/api/user', parametreRoutes);
app.use('/api/user', secUserRoutes);


const PORT = process.env.PORT || 3001;
// bech lapplication taaref lport eli bech tekhdem aalih
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
