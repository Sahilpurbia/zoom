import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from 'node:http';
import { connectToSocket } from './controllers/socketManager.js';
import router from "./routes/user.router.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const PORT = 8000;

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/user", router);

app.get("/zoom",(req,res)=>{
    res.send({"Hello": "world"});
})

async function Main(){
    await mongoose.connect(process.env.MONGO_URL)
    server.listen(PORT,()=>{
        console.log(`Server listining on port ${PORT}`);
    });
}


Main()
.then((res)=>console.log("connected to DB"))
.catch((err)=>console.log(err));


