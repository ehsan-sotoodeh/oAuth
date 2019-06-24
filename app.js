const express = require('express');
const authRoutes = require('./routes/auth-routes')
const PORT_NUMBER = 4000;
const app = express();
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const SESSION_LIFE_SPAN_IN_DAYS = 10;

// setup view engin
app.set("view engine","ejs");

app.use(cookieSession({
    maxAge : SESSION_LIFE_SPAN_IN_DAYS * (24*60*60*1000), // 
    keys:[process.env.COOKIE_KEY]
}));


// initialize passport 
app.use(passport.initialize());
app.use(passport.session());





// set up routes
app.use('/auth', authRoutes);

// create home routes
app.get('/',(req,res) =>{
    res.render('home');
});

app.listen(PORT_NUMBER, ()=>{
    console.log(`app now is listening to ${PORT_NUMBER}`);
})
