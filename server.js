const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})
