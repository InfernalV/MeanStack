const Message = require('../Models/Message.model');


const getMessages = async (req, res) => {
    try {
        const message = await Message.find({});
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
const getMessageById= async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const postMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndUpdate(id, req.body);
        if(!message){
            return res.status(404).json({ message: "No message found" });
        }
        const updatedMessage = await Message.findById(id);

        res.status(200).json(updatedMessage)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const newMessage = await Message.findByIdAndDelete(id);
        if(!newMessage){
            return res.status(404).json({ message: "No message found" });
        }
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getMessages,
    getMessageById,
    postMessage,
    updateMessage,
    deleteMessage
}