import express from 'express'; 
import cors from 'cors'; // Import cors
import dotenv from 'dotenv'; // Import dotenv
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL?.replace(/\/$/, '') || "http://localhost:5173", // Ensure a default URL
    credentials:true,
}));
const data = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// console.log(data)
app.use(cookieParser());
app.use(express.json()); 

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/users',userRoute);


app.listen(8080, () => {
    console.log('App started on port 8080');
});
