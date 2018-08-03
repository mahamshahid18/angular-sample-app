'use strict';

import data from './data';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(8000, () => {
    console.log('App listening on port 8000');
})

app.get('/', (req, res) => {
    res.send('Greetings, young one!');
});

app.route('/data')
    .get((req, res) => {
        res.status(200);
        res.send(data);
        console.log('Data sent!\n');
        // console.log(data + '\n');
    });

app.all('*', (req, res) => {
    res.status(404);
    res.send('Invalid path/url!');
});