const express = require('express');
const IngredientsAccessor = require('./ingredientsAccessor');

const app = express();
const accessor = new IngredientsAccessor();

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

    try{
      const ingredient = accessor.getName(id, function(err,ingredient){
        if(err){
          res.status(404).send('Ingredient not found.');
        }
        else{
          res.status(200).send(ingredient);
        }
      });
    }
    catch(err){
      console.log(err);
      res.status(500).send('Database access error.');
    }
  }
  else {
    res.status(400).send('Incorrect query: expected syntax is http://address:port/ingredient?id=value');
  }
});

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
app.get('/ingredient-list', async (req, res) => {
  try{
    const ingredient = accessor.getList(function(err,ingredients){
      if(err){
        res.status(500).send('Unkown server error.');
      }
      else{
        res.status(200).send(JSON.stringify(ingredients));
      }
    });
  }
  catch(err){
    console.log(err);
    res.status(500).send('Database access error.');
  }
});

app.listen(3001, () => console.log('App listening on port 3001'));