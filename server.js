//Express declaration
let express = require('express');
let app =  express();

//BodyParser declaration
var bodyParser = require('body-parser'); //To pass data betwen pages
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Bootstrap declaration
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

/*
//Database declaration
var pg = require('pg');
var conString = "postgres://postgres:6453508@localhost/vmgiver_beta1";
var vm_query = "SELECT row_to_json(fc) FROM (SELECT array_to_json(array_agg(f)) As Datos FROM (" + 
"SELECT ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id_users,name)) As properties" + 
" FROM users As lg) As f) As fc";
*/

//Extension JS files declaration
var redirectToPages = require('./redirectToPagesWithNoVariables/redirectpages')
redirectToPages(app);
var redirectToPagesWithVariables = require('./redirectToPagesWithVariables/redirectpageswithvar')
redirectToPagesWithVariables(app);


//EJS declaration
app.set('view engine', 'ejs') //Templates Editor
app.use('/assets',express.static('public')) //Where are CSS


app.get('/',(req,res) => {
   // res.send('Hello Harry, What could I do for you');
   res.render('pages/index');
})


console.log("Hello Harry");
app.listen(5000); //Listen to the port 5000
