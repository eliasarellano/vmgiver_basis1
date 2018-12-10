module.exports = {

    
    testvar :function (req,res,next){
        let toshow = {
            name : 'Elias'
        }
        res.render('pages/listyoursvm',toshow);
    },

    showlistvm :function (req,res,next){

        var pg = require('pg');
        var conString = "postgres://postgres:6453508@localhost/vmgiver_beta1";
        var vm_query = "SELECT * FROM users;";
        var client = new pg.Client(conString);
        client.connect();

        client.query(vm_query,(err, result) => {
            if (err) {
              console.log(err.stack)
            } else {
            //   obj = {tolist: result};
               yeah = result.rows;
            //   console.log(yeah);
               res.render('pages/listyoursvm',yeah); 
            }
          })
    },

    senddate : function(){
         //get date of today
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();
         var hh = today.getHours();
         var min = today.getMinutes();
         var ss =  today.getSeconds();
         if(dd<10) {
             dd = '0'+dd
         } 
         if(mm<10) {
             mm = '0'+mm
         } 
         today = yyyy + '-' + mm + '-' + dd + ' ' + hh +':' + min + ':' + ss ;
        return today;
    }
};