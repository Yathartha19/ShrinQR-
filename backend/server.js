import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import shortRoutes from './routes/shortener.routes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
connectDB();

app.use(cors());

app.use(express.json());

app.use('/', shortRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)    
})