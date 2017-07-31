var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    app = express();

/* public folder is base directory */ 
app.use(express.static(__dirname+'/live'));

app.use(bodyParser.json());
app.use(cors());

//connection
var port = 8080;

app.listen(port || 8080);
console.log('Listening on port ' + port);

