// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (newdate) => newdate.toUTCString() === "Invalid Date"

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  let newdate = new Date(req.params.date)
  if (isInvalidDate(newdate)) {
    newdate = new Date(+req.params.date)
   
  }

  if (isInvalidDate(newdate)) {
    res.json({ error: "Invalid Date" })
    return
  }


  res.json({
    unix: newdate.getTime(),
    utc: newdate.toUTCString()
  })
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

// app.get("/api/1451001600000", (req, res) => {
//   res.json({
//     unix: "1451001600000",
//     utc: "Fri, 25 Dec 2015 00:00:00 GMT"
//   })
// });



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
