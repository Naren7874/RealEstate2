import express from 'express'; 
import cors from 'cors'; // Import cors
import dotenv from 'dotenv'; // Import dotenv
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { v2 as cloudinary } from 'cloudinary'
import { app, server } from './socket/socket.js';

dotenv.config(); // Load environment variables


app.use(cors({
    origin: process.env.CLIENT_URL?.replace(/\/$/, '') || "http://localhost:5173", // Ensure a default URL
    credentials:true,
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// console.log(data);

app.use(cookieParser());
app.use(express.json(
    {
        limit: '50mb',
    }
)); 

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/users',userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


server.listen(8080, () => {
    console.log('App started on port 8080');
});
