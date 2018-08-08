'use strict';

import data from './data';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const httpStatus = {
    success: 200,
    successNoBody: 204,
    badRequest: 400,
    notFound: 404,
    internalServer: 500
};
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
        res.status(httpStatus.success);
        res.send(data);
        console.log('Data sent!\n');
    })
    .post((req, res, next) => {
        let status = httpStatus.badRequest;
        const resource = JSON.parse(req.body.item);
        let dataContainsItem = data.filter(item => item.id === +resource.id).length;
        if ((resource != null) &&
            (resource != undefined) &&
            !dataContainsItem) {
            data.push(resource);
            status = httpStatus.success;
        }
        res.status(status);

        if (status === httpStatus.success) {
            res.send(resource);
            console.log(resource + ' added!');
        }
        else {
            const errMsg = dataContainsItem ?
                'This item already exists in the array!' :
                'Undefined resource received!';
            const err = new Error(errMsg);
            next(err);
            res.send(err);
        }
    });

app.route('/data/:id')
    .get((req, res)=> {
        const matchedItem = data.filter(item => {
            return item.id === +req.params.id;
        });
        res.status(httpStatus.success);
        res.send(matchedItem);
        console.log(`item sent: ${JSON.stringify(matchedItem)}\n`);
    })
    .patch((req, res, next) => {
        let params = JSON.parse(req.body.params);
        if (params) {
            if ((params.op === 'replace') &&
                (params.path) &&
                (params.value)) {
                    let index = data.findIndex(item => item.id === +req.params.id);
                    data[index][params.path] = params.value;
                    res.status(httpStatus.successNoBody);
                    console.log('Resource updated! New data: ');
                    console.log(data);
            } else {
                res.status(httpStatus.badRequest);
                next(new Error('Bad Request: this route only accepts "replace" operation requests'));
            }
        } else {
            res.status(httpStatus.badRequest);
            next(new Error('Bad Request: no json params provided'));
        }

        res.send();
    })
    .delete((req, res) => {
        let id = +req.params.id;
        let indexOfItem = data.findIndex(item => item.id === id);
        data.splice(indexOfItem, 1);
        res.status(httpStatus.successNoBody);
        res.send();
        console.log('Item deleted, remaining data: ' + JSON.stringify(data));
    });

app.all('*', (req, res) => {
    res.status(httpStatus.notFound);
    res.send('Invalid path/url!');
});