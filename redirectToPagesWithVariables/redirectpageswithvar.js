module.exports = (app) =>{

    //Database declaration
var pg = require('pg');
var conString = "postgres://postgres:6453508@localhost/vmgiver_beta1";
// var vm_query = "SELECT row_to_json(fc) FROM (SELECT array_to_json(array_agg(f)) As Datos FROM (" + 
// "SELECT ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id_users,name)) As properties" + 
// " FROM users As lg) As f) As fc";

var vm_query = "SELECT * FROM users;";
    
    //Redirect to checklogin : test if the login is good
   app.post('/checklogin',(req,res) => {
        // if is good, so go to the cyber
        res.render('pages/cyber');
    })
    
    //Redirect to todosignup to register the new user
    app.post('/todosignup',(req,res)=>{
        res.render('pages/todosignup')
    })

  
    app.get('/createvm',(req,res)=>{
        res.render('pages/createvm')
    })

    app.get('/data',(req,res)=>{
        var client = new pg.Client(conString);
        
        client.connect();
        client.query(vm_query,(err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              console.log(res.rows[0])
            }
          })

        // client.connect();
        // var query = client.query(vm_query);

        // query.on("row",(row,result)=>{
        //     result.adddRow(row);
        // });

        // query.on("end",(result)=> {
        //     res.json(result,rows[0].row_to_json);
        //     res.end();
        // })
    })



}