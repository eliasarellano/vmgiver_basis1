module.exports = (app) =>{

    var todovar =  require('./todovar');


    //Database declaration
var pg = require('pg');
var conString = "postgres://postgres:6453508@localhost/vmgiver_beta1";
// var vm_query = "SELECT row_to_json(fc) FROM (SELECT array_to_json(array_agg(f)) As Datos FROM (" + 
// "SELECT ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id_users,name)) As properties" + 
// " FROM users As lg) As f) As fc";

let express = require('express');
        //BodyParser declaration
var bodyParser = require('body-parser'); //To pass data betwen pages
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var vm_query = "SELECT * FROM users;";
    
    //Redirect to checklogin : test if the login is good
   app.post('/checklogin',(req,res) => {
        // if is good, so go to the cyber
        var bodyParser = require('body-parser'); //To pass data betwen pages
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        var JSAlert = require("js-alert");
        var alerta = require("alert-node");
        var client = new pg.Client(conString);
          client.connect();

          const find_user = `SELECT username,password FROM users WHERE username = $1 AND password = $2 `;
          const value = [
            req.body.username,
            req.body.password
          ]

          client.query(find_user,value,(err, resp) => {
            if (resp.rowCount==0) {
              //import alert from 'alert-node'
 
              alerta('howdy');
              //JSAlert.alert("The Username or Password is wrong","Files Saved", "Got it");
              //console.log(err.stack)
            } else {
       //       client.close();
             res.render('pages/cyber');
             console.log(resp);
             console.log("Welcome");
            }
          })

        
    })
    
    //Redirect to todosignup to register the new user
    app.post('/todosignup',(req,res)=>{
        res.render('pages/todosignup')
    })

    app.get('/createvm',(req,res)=>{
        res.render('pages/createvm')
    })

  //  app.get('/listvmdata',todovar.testvar); 
      app.get('/listvmdata',todovar.showlistvm);



      app.post('/adduser',(req,res) => {
      var bodyParser = require('body-parser'); //To pass data betwen pages
      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      var client = new pg.Client(conString);
        client.connect();
        var today = todovar.senddate();
        //SELECT TO_CHAR(NOW(),'YYYY-MM-DD HH24-MI-SS')

        const user_added = `INSERT INTO users (name,last_name,date_of_birth,profession,sex,mail,username,password,creation_date_user,vm_quantity,reason_of_account) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *`;
        const values = [
          req.body.firstname,
          req.body.lastname,
          req.body.birthday,
          "student",
          req.body.gender,
          req.body.email,
          req.body.username,
          req.body.password,
          today,
          1,
          req.body.description
        ];

        client.query(user_added,values,(err, res) => {
          if (err) {
            console.log(err.stack)
          } else {
     //       client.close();
            console.log("user added");
          }
        })
    })

    app.post('/addvm',(req,res) => {

      var bodyParser = require('body-parser'); //To pass data betwen pages
      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      var client = new pg.Client(conString);
        client.connect();
        var today = todovar.senddate();

        var insert_vm_installed = `INSERT INTO installed_vm (id_user,name_vm,operating_system,core_quantity,ram_quantity,hard_disk_quantity,creation_date_vm,reason_of_vm,ip_adress_vm) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;

        const values = [
          1,
          req.body.namevm,
          req.body.os,
          req.body.corequantity,
          req.body.ramquantity,
          req.body.harddisk,
          today,
          req.body.reasonofvm,
          "10.1.1.1"
        ];
        
        client.query(insert_vm_installed,values,(err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
         ///     client.close();
              console.log("vm added");
            }
          })
    })

    app.get('/data',(req,res)=>{
        var client = new pg.Client(conString);
        
        client.connect();
        client.query(vm_query,(err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              client.close();
              console.log(res.rows[0])
            }
          })
    })

}