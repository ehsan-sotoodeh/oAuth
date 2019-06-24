const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config()
let usersArray = [];

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    //get user from db by id
    usersArray.map(user=>{
        if(user.id === id){
            done(null,user);
        }
    })
    
});


passport.use(
    new GoogleStrategy({
    // option for strategy
        callbackURL : '/auth/google/redirect',
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done)=>{
        // passport callback function
        console.log(profile.id)
        console.log(profile.displayName)
        //made sure you have recorded user's information in Db
        //... if you havn't then do it here.
        let newUser = { 
            id : 654645, //Id of user in my db 
            profileId :profile.id, 
            userName : profile.displayName
        };
        usersArray.push(newUser);
        done(null,newUser);
    })
);