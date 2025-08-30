const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    title: { 
        type: String,
        required: [true, "Please enter title"],
    },
    text: { 
        type: String,
        required: [true, "Please enter text"],
    },
    img: { 
        type: String,
        required: [true, "Please enter img link"],
        default: "https://example.com/default.jpg",
    },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
