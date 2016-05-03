var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var User       = require('./models/user');
var Doctor       = require('./models/doctor');

module.exports = function(app, passport) {

// old routes ===============================================================
/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
*/
/*
var bugData = [
  {id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open!!'},
  {id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
];
*/

app.get('/api/bugs', function(req, res) {
    res.json('This worked.');
    /*
  console.log("Query string", req.query);
  var filter = {};
  if (req.query.priority)
   filter.priority = req.query.priority;
 if (req.query.status)
   filter.status = req.query.status;

 db.collection("bugs").find(filter)
 .toArray(function(err,docs){
   res.json(docs);
 });
*/
});

app.get('/api/bugs/:id',function(req,res){
  db.collection("bugs").find({_id:ObjectId(req.params.id)}).limit(1).next(function(err,doc){
   res.json(doc);
 });
});

app.use(bodyParser.json());
app.post('/api/bugs', function(req, res) {
  console.log("Req body:",req.body);
  var newBug = req.body;
    //newBug.id = bugData.length+1;
    //bugData.push(newBug);
    db.collection("bugs").insertOne(newBug,function(err,result){
     var newId = result.insertedId;
     db.collection("bugs").find({_id:newId}).limit(1).next(function(err,doc){
       res.json(doc);
     });
   });
  });

/* Modify one record, given its ID */
app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  console.log("Modifying bug:", req.params.id, bug);
  var oid = ObjectId(req.params.id);
  db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
    db.collection("bugs").find({_id: oid}).limit(1).next(function(err, doc) {
      res.send(doc);
    });
  });
});
// old routes ===============================================================


// normal routes ===============================================================
/*
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
*/
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        console.log('server side logging out');
        req.logout();
        //res.redirect('/');
        res.json({message: 'logged out'});
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        /*
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });
        */

        // process the login form
        /*
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/api/bugs', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        */

        app.post('/login', function(req, res, next) {
            console.log('am i here');
            passport.authenticate('local-login', function(err, user, info) {
                console.log('im in here now');
        if (err || !user) {
            console.log('problem here');
            console.log(err);
            console.log(info);
            console.log(user);
            //console.log(req.login);
            //console.log(req.login.toString());
            res.status(400).send(info);
        } else {
            console.log('got here instead');
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                console.log('what is this function');
                if (err) {
                    console.log('maybe even here');
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    // Everything is good. Create token to send back.
                    // if user is found and password is right
                    // create a token
                    console.log('everything is good. logging in.')
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    console.log(user);
                    console.log(token);
                    res.json({user: user,token: token});
                }
            });
        }
            /*
            passport.authenticate('local-login', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.render('login', {message: req.flash('loginMessage')}); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.redirect('/');
                });
*/

            })(req, res, next);
        });

        // SIGNUP =================================
        // show the signup form
        /*
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
        */

        /*
        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        */

        // process the signup form
        /*
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        */

        app.post('/signup', function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
            if (err || !user) {
                console.log(err);
                console.log(info);
                console.log(user);
                //console.log(req.login);
                //console.log(req.login.toString());
                res.status(400).send(info);
            } else {
                console.log('got here instead');
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                req.login(user, function(err) {
                console.log('what is this function');
                if (err) {
                    console.log('maybe even here');
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    // Everything is good. Create token to send back.
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    res.json({user: user,token: token});
                }
            });
        }

            })(req, res, next);
        });

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',function(req, res, next) {
            console.log('get callback start');
            passport.authenticate('facebook', function(err, user, info) {
            if (err || !user) {
                console.log(err);
                console.log(info);
                console.log(user);
                //console.log(req.login);
                //console.log(req.login.toString());
                res.redirect('/#/index');
                //res.status(400).send(info);
            } else {
                console.log('got here instead');
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                req.login(user, function(err) {
                    console.log('what is this function');
                    if (err) {
                        console.log('maybe even here');
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        // Everything is good. Create token to send back.
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        res.redirect('/#/facebookcallback?token='+token);
                        console.log('i think we logged in via facebook');
                        //res.json({user: user,token: token});
                        /*
                          var options = {
                            root: __dirname + '/static/',
                            dotfiles: 'deny',
                            headers: {
                                'x-timestamp': Date.now(),
                                'x-sent': true
                            }
                        };
                        res.sendFile('index.html',options);
                        */
                        //res.sendFile('/static/index.html', {root: __dirname});
                    }
                });
            }

            })(req, res, next);
        }
        );

    app.get('/isuserloggedin', isLoggedIn, function(req, res) {
        var user            = req.user;
        res.json({user:user,loggedIn:true});
    });

/*
        app.get('/auth/facebook/callback',function(req, res, next) {
            console.log('get callback start');
            passport.authenticate('facebook', function(err, user, info) {
            if (err || !user) {
                console.log(err);
                console.log(info);
                console.log(user);
                //console.log(req.login);
                //console.log(req.login.toString());
                res.status(400).send(info);
            } else {
                console.log('got here instead');
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                req.login(user, function(err) {
                    console.log('what is this function');
                    if (err) {
                        console.log('maybe even here');
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        // Everything is good. Create token to send back.
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        res.redirect('/#/profile');
                        //res.json({user: user,token: token});
                    }
                });
            }

            })(req, res, next);
        }
        );
*/

        /*
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
        */
    /*
    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
    */

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

        /*
    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));
    */
// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    /*
    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
    */


//----------------------------------------------------------------//
//----------------------------------------------------------------//
//----------------------------------------------------------------//
    // RESET PASSWORD FUNCTIONALITY
    app.post('/forgot', function(req, res, next) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ 'local.email' : req.body.email }, function(err, user) {
            if (!user) {
                var info = {message: 'No account with that email address exists.'};
                res.status(400).send(info);
                //req.flash('error', 'No account with that email address exists.');
                //return res.redirect('/forgot');
            }
            else{
                console.log('saving the user after forgot');
                user.local.resetPasswordToken = token;
                user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    console.log('In the save callback. Error is:',err);
                  done(err, token, user);
                });
            }
        });
      },
      function(token, user, done) {
        console.log('In mailer');
        console.log(token);
        console.log(user);
        console.log(user.email);
        console.log(user.local.email);
        console.log(user.local.resetPasswordToken);
        var smtpTransport = nodemailer.createTransport('smtps://snap.bella.forgot%40gmail.com:resetpass@smtp.gmail.com');

        /*
        var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'snap.bella.forgot',
              pass: 'resetpass'
          }
        });
        */

          var mailOptions = {
            to: user.local.email,
            from: 'snap.bella.forgot@gmail.com',
            subject: 'snapBella Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            if(!err){
            console.log('I sent the mail');
            var info = {message: 'An e-mail has been sent to ' + user.local.email + ' with further instructions.'};
            res.send(info);
            }
            //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
        });
    }
    ], function(err) {
        console.log('last forgot function');
        if (err){ 
            console.log('an error occurred in sending the mail')
            return next(err);
            var info = {message: 'An error occurred.'};
            res.status(400).send(info);
        }
        //res.redirect('/forgot');
    });
    });
    
    app.post('/findresetuser',function(req, res) {
        console.log('findresetuser');
        console.log(req.body);
        console.log(req.body.token);
        console.log({ $gt: Date.now() });
        User.findOne({ 'local.resetPasswordToken': req.body.token}, 
            function(err, user) {
                if (!user) {
                    console.log('no user has that token');
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    //return res.redirect('/forgot');
                }
                else console.log('a user does have that token');
          });
        User.findOne({ 'local.resetPasswordToken': req.body.token, 
            'local.resetPasswordExpires': { $gt: Date.now() } }, 
            function(err, user) {
                if (!user) {
                    console.log('a user matching the reset was not found');
                    var info = {message: 'An error occurred.'};
                    res.status(400).send(info);
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    //return res.redirect('/forgot');
                }
                else{
                    console.log('a user matching the reset was found');
                    res.json({user: user});
                }
          });
    });


    app.post('/resetpassword',function(req, res) {
        console.log('resetpassword');
        console.log(req.body);
        User.findOne({ 'local.resetPasswordToken': req.body.token, 
            'local.resetPasswordExpires': { $gt: Date.now() } }, 
            function(err, user) {
                if (!user) {
                    console.log('a user matching the reset was not found');
                    var info = {message: 'No user matching that token was found.'};
                    res.status(400).send(info);
                    //req.flash('error', 'Password reset token is invalid or has expired.');
                    //return res.redirect('/forgot');
                }
                else{
                    console.log('a user matching the token was found');
                    console.log('saving the user after password reset');
                    user.local.password = user.generateHash(req.body.password);
                    user.local.resetPasswordToken = undefined;
                    user.local.resetPasswordExpires = undefined;

                    user.save(function(err) {
                        console.log('In the save callback. Error is:',err);
                        if(err){
                            var info = {message: 'Save failed'};
                            res.status(400).send(info);
                        }
                        else res.json({message: 'password reset'});
                    });
                }
          });
    });


//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////
//////////////// DATA SUBMISSION AND RETREIVAL ////////////////////////

    // get user info route
    app.get('/api/user', verifyToken, function(req,res) {
        console.log(req.decoded);
        console.log(req.decoded._doc);
        res.status(200).send({ 
        success: true, 
        message: 'Token worked, I think.' 
        });
    });

    // get doctors route
    app.get('/api/doctors', verifyToken, function(req,res) {
        console.log(req.decoded);
        console.log(req.decoded._doc);
        Doctor.find({},function(err, doctors){
            if(err) return res.status(403).send({ 
                success: false   
            });
            else return res.status(200).send({
                success: true,
                doctors: doctors
            });
        });

    });

    // get doctors route with filter
    app.get('/api/doctors/filter', function(req,res) {
        console.log("Query string", req.query);
        var filter = {};

        // The old way where you actually search for a city
        //if (req.query.city)
        //    filter.city = req.query.city;

        // The new way where you convert city to state
        if (req.query.city)
            if(req.query.city === "Boston")
                filter.state = "MA";
            else if(req.query.city === "Los Angeles")
                filter.state = "CA";
            else if(req.query.city === "New York")
                filter.state = "NY";

        // search array of procedures as follows
        if (req.query.procedure)
            filter.procedures = req.query.procedure;

        Doctor.find(filter,function(err, doctors){
            if(err) return res.status(403).send({ 
                success: false   
            });
            else return res.status(200).send({
                success: true,
                doctors: doctors
            });
        });

    });

    // get user info route
    app.get('/api/admin', verifyToken, function(req,res) {
        console.log(req.decoded);
        console.log(req.decoded._doc);
        console.log(req.decoded._doc.local.email);
        if(req.decoded._doc.local.email === 'super@admin'){
            return res.status(200).send({ 
                success: true, 
                message: 'You are an admin!'
            });
        }
        else return res.status(403).send({ 
                success: false, 
                message: 'Not an admin'
            });
    });

    app.post('/submit/doctor', verifyToken, function(req, res, next) {
        //console.log(req);
        //console.log(req.body);
        console.log('!!!!!!!!');
        console.log(req.body.data);
        console.log(req.body.data.procedures.length);
        //res.json({success:false});


        Doctor.findOne({name:req.body.data.name,
                        numandstreet:req.body.data.numandstreet,
                        city:req.body.data.city,
                        state:req.body.data.state,
                        zip:req.body.data.zip}, 
            function(err, doctor) {
            // if there are any errors, return the error
            if (err)
                return res.status(403).send({ 
                    success: false, 
                    message: err
                });

            // check to see if theres already a doctor with that info
            if (doctor) {
                return res.status(403).send({ 
                    success: false, 
                    message: 'That doctor already exists.'
                });
            } else {

                // create the doctor
                var newDoctor            = new Doctor();

                
                newDoctor.name          = req.body.data.name;
                newDoctor.numandstreet  = req.body.data.numandstreet;
                newDoctor.city          = req.body.data.city;
                newDoctor.state         = req.body.data.state.toUpperCase();
                newDoctor.zip           = req.body.data.zip;
                newDoctor.phone         = req.body.data.phone;
                newDoctor.url           = req.body.data.url;
                newDoctor.education     = req.body.data.education;
                newDoctor.hospaff       = req.body.data.hospaff;
                newDoctor.specialties   = req.body.data.specialties;
                newDoctor.procedures    = req.body.data.procedures;
                newDoctor.prices        = req.body.data.prices;
                

                newDoctor.save(function(err) {
                    if (err)
                        return res.status(403).send({ 
                                    success: false, 
                                    message: err
                                });

                    return res.status(200).send({ 
                                success: true, 
                                message: 'Doctor save worked'
                            });
                });
            }
        });
    });

    app.post('/update/doctor', verifyToken, function(req, res, next) {
        //console.log(req);
        //console.log(req.body);
        console.log('!!!!!!!!');
        console.log(req.body.data);
        console.log(req.body.data.procedures.length);
        //res.json({success:false});

        var filter = req.body.data._id ? {_id:req.body.data._id}
                        : {name:req.body.data.name,
                        numandstreet:req.body.data.numandstreet,
                        city:req.body.data.city,
                        state:req.body.data.state,
                        zip:req.body.data.zip};


        console.log('The filter became: '+Object.keys(filter).length);

        Doctor.findOne(filter, 
            function(err, doctor) {
            // if there are any errors, return the error
            if (err)
                return res.status(403).send({ 
                    success: false, 
                    message: err
                });

            // check to see if theres already a doctor with that info
            if (!doctor) {


                return res.status(403).send({ 
                    success: false, 
                    message: 'That doctor does not exist.'
                });
            } else {

                // update the doctor

                doctor.name          = req.body.data.name;
                doctor.numandstreet  = req.body.data.numandstreet;
                doctor.city          = req.body.data.city;
                doctor.state         = req.body.data.state.toUpperCase();
                doctor.zip           = req.body.data.zip;
                doctor.phone         = req.body.data.phone;
                doctor.url           = req.body.data.url;
                doctor.education     = req.body.data.education;
                doctor.hospaff       = req.body.data.hospaff;
                doctor.specialties   = req.body.data.specialties;
                doctor.procedures    = req.body.data.procedures;
                doctor.prices        = req.body.data.prices;


                doctor.save(function(err) {
                    if (err)
                        return res.status(403).send({ 
                                    success: false, 
                                    message: err
                                });

                    return res.status(200).send({ 
                                success: true, 
                                message: 'Doctor update worked'
                            });
                });
            }
        });
    });

    app.post('/delete/doctor', verifyToken, function(req, res, next) {
        //console.log(req);
        //console.log(req.body);
        console.log('!!!!!!!!');
        console.log(req.body.data);
        console.log(req.body.data.procedures.length);
        //res.json({success:false});

        var filter = {_id:req.body.data._id};

        console.log('The filter became: '+Object.keys(filter).length);

        Doctor.findOne(filter, 
            function(err, doctor) {
            // if there are any errors, return the error
            if (err)
                return res.status(403).send({ 
                    success: false, 
                    message: err
                });

            // check to see if theres already a doctor with that info
            if (!doctor) {


                return res.status(403).send({ 
                    success: false, 
                    message: 'That doctor does not exist.'
                });
            } else {
                doctor.remove(function(err) {
                    if (err)
                        return res.status(403).send({ 
                                    success: false, 
                                    message: err
                                });

                    return res.status(200).send({ 
                                success: true, 
                                message: 'Doctor delete worked'
                            });
                });
            }
        });
    });


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log('checking isLoggedIn')
    if (req.isAuthenticated()){
        console.log('yes we are logged in');
        return next();
    }

    console.log('we are not logged in');
    res.redirect('/#/notloggedin');
}

// route middleware to verify a token
function verifyToken(req,res,next) {

    // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        console.log("Failed to authenticate token: "+err)
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

};