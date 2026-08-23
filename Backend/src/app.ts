import express from "express";
import type { Request , Response } from "express";
import productroutes from './products/routes.js'
import servicesroutes from './services/routes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/' , (req:Request , res:Response) => {
    res.send("Hello ")
})


app.use('/api/products' , productroutes);
app.use('/api/services', servicesroutes)

app.use('/products', productroutes);
app.use('/services', servicesroutes);

export default app