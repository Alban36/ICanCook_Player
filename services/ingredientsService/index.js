const express = require('express');
const config = require('./config');
const app = express();

app.get('/ping', (req, res) => res.send('pong'));

/**
 * @api {get} /ingredient get the ingredient information
 * @apiName ingredientsService
 * @apiDescription This endpoint will get the information of a specific ingredient
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} id
 *
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://address:port/ingredient?id=453jfsdf?43
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "id":"43*7r(eui439",
 *      "name":"tomato"
 *   }
 */
app.get('/ingredient', async (req, res) => {
  if(req.query.hasOwnProperty('id')) {
    const id = req.query.id
    res.status(200).send(id);
  }
  else {
    res.status(400).send('Incorrect query: expected syntax is http://address:port/ingredient?id=value');
  }
});

app.listen(3001, () => console.log('App listening on port 3001'));