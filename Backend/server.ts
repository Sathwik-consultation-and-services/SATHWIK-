import http from 'http';
import app from './src/app.js'

import dotenv from 'dotenv'
dotenv.config()

const PORT : Number  = Number(process.env.PORT);
const server = http.createServer(app);

server.listen(PORT , () => {
    console.log(`Server is running on port : ${PORT}`)
})