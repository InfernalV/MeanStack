import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageRoutes from './Routes/message.route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/messages", messageRoutes); 

// DB & Server connection
mongoose.connect('mongodb+srv://stijnhoeveler:46Fh1dmJsMQbzJsY@lines.vdlq9ez.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Lines')
    .then(() => {
        console.log('Connected!');
        app.listen(5000, () => {
            console.log("Why hello there Stardust. Oooohh on port 5000 really~");
        });
    })
    .catch((err) => {
        console.log('Signal Failed', err);
    });
