const Owner = require('../models/Owner')

const specificOwner = async (req, res) => {
    try {
        const foundOwner = await Owner.findById(req.ownerId)
        
        res.status(200).json({ 
            teamName: foundOwner.teamName, 
            email: foundOwner.email 
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const allOwners = async (req, res) => {
    try {
        const owners = await Owner.find({})
        res.status(200).json({ owners })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }   
}

const clear = async (req, res) => {
    try {
        await Owner.deleteMany({})
        res.status(200).json({ msg: 'All owners have been deleted '})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateOwnerEmail = async (req, res) => {
  try {
    const foundOwner = await Owner.findOne({email: Owner.email})
    foundOwner.email.push({
        email: req.body
    })
    res.status(200).json({msg: 'Updated email!'})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    specificOwner,
    allOwners,
    clear,
    updateOwnerEmail
}