const express = require('express');
const cors = require('cors');

require('dotenv').config();

const mongoConfig = require('./configuration/config');

const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

const { authorize } = require('./middleware/authMiddleware');

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/owners', authorize, ownerRoutes);

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
    mongoConfig()
})

