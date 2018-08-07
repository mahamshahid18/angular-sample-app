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
    });

app.route('/data/:id')
    .get((req, res)=> {
        const matchedItem = data.filter(item => {
            return item.id === +req.params.id;
        });
        res.status(200);
        res.send(matchedItem);
        console.log(`item sent: ${JSON.stringify(matchedItem)}\n`);
    })
    .delete((req, res) => {
        let id = +req.params.id;
        let indexOfItem = data.findIndex(item => item.id === id);
        data.splice(indexOfItem, 1);
        res.status(200);
        res.send();
        console.log('Item deleted, remaining data: ' + JSON.stringify(data));
    });

app.all('*', (req, res) => {
    res.status(404);
    res.send('Invalid path/url!');
});