import express from "express";
import { chats } from "./data/data.js";
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRouter from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { config } from 'dotenv';
import path from "path";
config();
connectDb();

const app = express();
const httpServer = createServer(app);

app.use(cors());


app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
// -----------DeployMent------

const __dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
    })
}

else {
    app.get('/', (req, res) => {
        res.send("API is Running Successfully");
    });
}

// ----------Deployment------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server is Started at Port ${PORT}`);
});

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined Room' + room);
    })
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
    socket.on('new message', (newMessageRecived) => {
        var chat = newMessageRecived.chat;

        if (!chat.users) return console.log('chat.users is not defined');

        chat.users.forEach(user => {
            if (user._id === newMessageRecived.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecived);
        });
    })

    socket.off('disconnect', () => {
        console.log("User Disconnected");
        // You should access userData from the socket object, as it's not in scope here.
        socket.leave(userData._id);
    })
})