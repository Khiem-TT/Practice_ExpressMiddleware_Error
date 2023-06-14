import express from 'express';
import bodyParser from "body-parser";
import fs from 'fs';

const port = 8000;
const app = express();

app.use(bodyParser.json());

app.get('/one', (req, res, next) => {
    fs.promises.readFile('./one.txt')
        .then(data => res.send(data))
        .catch(err => next(err));
});

app.use((error, req, res, next) => {
    console.error("Error 1111: ", error);

    if (error.type === 'time-out') {
        res.status(408).send(error);
    } else {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});