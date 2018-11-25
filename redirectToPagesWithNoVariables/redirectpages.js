module.exports = (app) =>{
    
    //Redirect to login
    app.get('/login',(req,res) => {
        res.render('pages/login');
    })

    //Redirect to signup
    app.get('/signup',(req,res) => {
        res.render('pages/signup');
    })   
    
    app.get('/aboutus',(req,res) => {
        res.render('pages/aboutus');
    })   
    
  
}