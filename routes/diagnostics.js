const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { time, errors } = req.body
  const { tip, topic, username } = errors;

  if (time && errors) {
    const newDiagnostic = {
      time,
      error_id: uuidv4(),
      errors: {
        tip,
        topic,
        username
      }
    }
    readAndAppend(newDiagnostic, './db/diagnostics.json');

    const response = {
      status: 'success',
      body: newDiagnostic,
    };
    res.json(response);
  } else {
    res.json('Error in posting diagnostic');
  }
});

module.exports = diagnostics;
