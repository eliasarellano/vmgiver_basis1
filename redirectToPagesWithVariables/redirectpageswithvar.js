module.exports = (app) =>{
    
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



}