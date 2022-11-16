const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT_ROUNDS | 0;

const Owner = require('../models/Owner')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const register = async (req, res) => {

    try {

        const foundOwner = await Owner.findOne({ teamName: req.body.teamName })

        if (foundOwner) {
            return res.status(400).json({ error: 'Owner already exists' })
        }

        const salt = await bcrypt.genSalt(saltRounds)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        const newOwner = await Owner.create({ ...req.body, password: encryptedPassword })

        const payload = { id: newOwner._id, owner: newOwner.teamName }
        const token = createToken(payload);
        console.log(token)

        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {

    try {

        const foundOwner = await Owner.findOne({ email: req.body.email })

        if (!foundOwner) {
            return res.status(404).json({ error: 'No such owner exists' })
        }

        const validPass = await bcrypt.compare(req.body.password, foundOwner.password)

        if (!validPass) {
            return res.status(403).json({ error: 'Invalid credentials '})
        }

        const payload = { id: foundOwner._id, owner: foundOwner.email }
        const token = createToken(payload);

        res.status(200).json({ token })
        console.log(token)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const test = async (req, res) => {
    try {
      res.status(200).send("Hello!")
    }
    catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
    }
  }

module.exports = {
    register,
    login,
    test
}