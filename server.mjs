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
        const queryParams = req.query;
        let result = data;
        if (Object.keys(queryParams).length) {
            let searchTerm = queryParams.term.toLowerCase();
            if (searchTerm != '') {
                result = data.filter(item => {
                    return item.name.toLowerCase().includes(searchTerm);
                });
            } else {
                result = [];
            }
        }
        res.status(httpStatus.success);
        res.send(result);
        console.log('Data sent!\n');
    })
    .post((req, res, next) => {
        let status = httpStatus.badRequest;
        const resource = req.body.item;
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
            console.log(resource);
            console.log(' added!');
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
    .get((req, res, next)=> {
        let response = {};
        const matchedItem = data.filter(item => {
            return item.id === +req.params.id;
        });
        if (matchedItem !== undefined &&
            matchedItem.length) {
            res.status(httpStatus.success);
            response = matchedItem;
            console.log(`item sent: ${JSON.stringify(matchedItem)}\n`);
        } else {
            response = new Error('Not Found: no such item found')
            res.status(httpStatus.notFound);
            next(response);
        }
        res.send(response);
    })
    .patch((req, res, next) => {
        let params = req.body.params;
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
    .delete((req, res, next) => {
        let id = +req.params.id;
        if (id) {
            let indexOfItem = data.findIndex(item => item.id === id);
            if (indexOfItem) {
                data.splice(indexOfItem, 1);
                res.status(httpStatus.successNoBody);
                console.log('Item deleted, remaining data: ' + JSON.stringify(data));
            } else {
                res.status(httpStatus.badRequest);
                next(new Error('Bad Request: no id provided to delete item'));
            }
        } else {
            res.status(httpStatus.badRequest);
            next(new Error('Bad Request: no id provided to delete item'));
        }
        res.send();
    });

app.all('*', (req, res) => {
    res.status(httpStatus.notFound);
    res.send('Invalid path/url!');
});