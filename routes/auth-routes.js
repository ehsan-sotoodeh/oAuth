const router = require('express').Router();
const passport = require('passport')
//auth login
router.get('/login',(req,res)=>{
    res.render('login');
});

//auth logOut
router.get('/logout',(req,res)=>{
    //haddle with passport
    res.send('loging out');
});

//auth login
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{

    //res.send(req.user)
    res.redirect('/profile/')
});

module.exports = router;