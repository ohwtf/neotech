const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const expressMongoDb = require('express-mongo-db');
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressMongoDb(db.url));
app.use(express.static('.'));
app.use(require('express-is-ajax-request'));
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');


MongoClient.connect(db.url, (err) => {
    if (err) { return console.log(err); }

    require('./app/routes')(app);

    app.listen(port, '0.0.0.0', () => {
        console.log('We are live on ' + port);
    });

});