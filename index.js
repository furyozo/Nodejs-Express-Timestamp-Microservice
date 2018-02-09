const express = require('express')
const app = express()

const Timestamp = require('./models/timestamp.js')
const ts = new Timestamp();

/**
 * if we get a correct get request, check its url variable for correct timestamp format
 * if the format is correct, return the readable date and timestamp format, otherwise return null
 */
app.get('/:timestamp', (req, res) => {

  const regDate = /[a-zA-Z]{1,}\s\d{1,2}(,)\s\d{0,4}/
  const regTimestamp = /\d{1,}/

  var params = req.params.timestamp

  if (!ts.matchExact(regDate, params) && !ts.matchExact(regTimestamp, params)) {
    res.send(ts.getNullTimestamp())
  }
  else if (ts.matchExact(regDate, params)) {
    res.send(ts.getTimeObjFromDate(params))
  }
  else if (ts.matchExact(regTimestamp, params)) {
    res.send(ts.getTimeObjFromTimestamp(params))
  }
  else {
    res.send(ts.getNullTimestamp())
  }

})

/**
 * default route, if the user failed to specify the route in correct format, return default route, which returs null
 */
app.get('*', (req, res) => res.send(ts.getNullTimestamp()))

app.listen(3000, () => console.log('Timestamp microservice app listening on port 3000!'))
