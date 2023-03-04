const express = require('express');
require('dotenv').config()
const cors = require("cors");
const { default: mongoose } = require('mongoose');
const app = express();
const bcrypt = require('bcrypt')
const colors = require('colors');
const User = require('./models/User')

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(
  cors({
    credential: true,
    origin: "http://127.0.0.1:5173",
  })
);


mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' .cyan + process.env.PORT .yellow)
})



app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        req.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app runing on port ${port}...`.cyan);
})