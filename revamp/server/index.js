import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dashRoutes from './routes/dashboard.js';

const app = express();



app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashRoutes);

const CONNECTION_URL = "mongodb+srv://huadmin:liberalcore@cluster0.fmycgav.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

//replace with env variables before deploying
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

