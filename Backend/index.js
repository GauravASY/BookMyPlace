import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {router} from './routes/routes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { configDotenv } from 'dotenv';
configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const location = path.join(__dirname ,'Uploads');



const app = express();
 mongoose.connect(`${process.env.DATABASE_URL}`)
 .then(()=> console.log("Connected to Database"));

app.use(express.json());
app.use(cors({
    origin : `${process.env.FRONTEND_URL}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
}));

app.use('/Uploads', express.static(location));

app.get("/", (req, res)=>{
    res.send("server is working here");
});

app.use('/api', router);

app.listen(3000)
