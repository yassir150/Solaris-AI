const PORT = 8000
import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai'

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/gemini',async (req,res )=>{
    console.log(req.body.message);
    const model = genAI.getGenerativeModel({model:"gemini-pro"})
    const msg = req.body.message
    
    const chat = model.startChat({
        answer: req.body.answer
    })

    const result = await chat.sendMessage(msg)
    const response = await result.response
    const txt = response.text();
    console.log(txt)
    res.send(txt)

})

app.listen(PORT, ()=>console.log('listening on port',PORT))


