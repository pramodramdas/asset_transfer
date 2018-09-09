require('dotenv').config();
// importing modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const handlebars = expressHandlebars.create({extname:'.html'});
const app = express();

// Added further layer of security
app.use(helmet());

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'lib/public')));
app.use(express.static(path.join(__dirname, 'node_modules/react-vis/dist/styles')));

mongoose.connect('mongodb://localhost/asset');
mongoose.connection
.once('open',()=>{
    require('./src/database/queries/asset_queries').loadAllAssets();
})
.on('error', (error) => {
    console.warn('Error', error);
});

require('./src/routes/api-routes')(app);

app.get('*', function (req, res) {
    return res.render('index', {
        layout: false
    });
});

// app.use((err, req, res) => {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err,
//     });
// });
  
module.exports = app;