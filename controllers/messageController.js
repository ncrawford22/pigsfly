const Message = require('../models/Message');

const allMessages = async (req, res) => {
    try {
        const foundMessages = await Message.find({})
        res.status(200).json({ messages: foundMessages})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }   
}

const createNewMessage = async (req, res) => {
    try {
        const createdMessage = await Message.create(req.body)
        res.status(200).json({ message: createdMessage })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const clearMessages = async (req, res) => {
    try {
        await Message.deleteMany({})
        res.status(200).json({ msg: 'All messages have been deleted '})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    allMessages,
    createNewMessage,
    clearMessages
}