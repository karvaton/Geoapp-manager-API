import express from 'express';
import router from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.BACKENDPORT || 5000;

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});

app.use('/', router);


async function start() {
    try {
        app.listen(port, () => console.log(`App running on port ${port}.`));
    } catch (error) {
        console.log(error);
    }
}

start();