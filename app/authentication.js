var $ = require('jquery');
//let {get, post, del, put} = require("./../RestHelper.js");

module.exports = {
  login(email, pass, cb) {
      //this.onChange();
      console.log('im in the login function');
      var request = {email: email, password: pass};
      cb = arguments[arguments.length - 1];
      console.log(localStorage.token);
      //delete localStorage.token;
      var token = (typeof window !== "undefined") ? localStorage.token : undefined;
      //console.log(token);
      //console.log(token===undefined);
      //console.log(token == null);
      //console.log(token === null);
      //console.log(token == undefined);
      //console.log(typeof(token));
      //if (token) console.log('true');
      //if (undefined) console.log('true again');
      if (token) {
        console.log('why am i goign here');
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      /*
      post('/auth/signin', {email: email, password: pass})
        .then((data) => {
          localStorage.token = Math.random().toString(36).substring(7);
          if (cb) cb(true)
          this.onChange(true)
        })
        .catch((err) => {
          if (cb) cb(false)
          this.onChange(false)
        });
      */
      console.log('i got to the ajax call');
      //var request = {username: email, password: pass};
      console.log(request);
      $.ajax({
        context: this,
        url: '/login', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log('im in then');
          console.log(data);
          localStorage.token = data.token;
          if (cb) cb(true,'');
          this.onChange(true);
        },
        function (data)  {
          console.log('well');
          console.log(this);
          //this.onChange();
          console.log('im in then 2');
          console.log(data);
          console.log(data.responseText);
          console.log(this.onChange);
          //console.log(this.onChange.toString());
          console.log(cb);
          console.log(cb.toString());
          if (cb) cb(false,data.responseJSON.message);
          this.onChange(false);
        }
        );
      /*
        .catch(function (err) {
          console.log('im in catch');
          if (cb) cb(false)
          this.onChange(false)
        });
      */
        console.log('i finished the ajax call');
    },


  signup(email, pass, cb) {
      console.log('im in the signup function');
      var request = {email: email, password: pass};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');

      console.log(request);
      $.ajax({
        context: this,
        url: '/signup', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log('im in then');
          console.log(data);
          localStorage.token = data.token;
          if (cb) cb(true,'');
          this.onChange(true);
        },
        function (data)  {
          console.log('well');
          console.log(this);
          //this.onChange();
          console.log('im in then 2');
          console.log(data);
          console.log(data.responseText);
          console.log(this.onChange);
          //console.log(this.onChange.toString());
          console.log(cb);
          console.log(cb.toString());
          if (cb) cb(false,data.responseJSON.message);
          this.onChange(false);
        }
        )
      /*
        .catch(function (err) {
          console.log('im in catch');
          if (cb) cb(false)
          this.onChange(false)
        });
      */
        console.log('i finished the ajax call');
    },

  loginFacebook(code, cb) {
      //this.onChange();
      console.log('im in the login facebook function');
      var request = {email: email, password: pass};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');

      console.log(request);
      $.ajax({
        url: '/auth/facebook/callback?code='+code, 
        type: 'GET'
      })
      .then(function (data)  {
          console.log('im in then');
          console.log(data);
          localStorage.token = data.token;
          if (cb) cb(true,'');
          this.onChange(true);
        },
        function (data)  {
          console.log('im in then 2');
          console.log(data);
          console.log(cb);
          console.log(cb.toString());
          if (cb) cb(false,data.responseJSON.message);
          this.onChange(false);
        }
        );
        console.log('i finished the ajax call');
    },

  forgot(email, cb) {
      //this.onChange();
      console.log('im in the forgot function');
      var request = {email: email};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/forgot', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log(data);
          if (cb) cb(true,'');
        },
        function (data)  {
          console.log(data);
          if (cb) cb(false,data.responseJSON.message);
        }
        );
    },

    findResetUser(token, cb) {
      console.log('im in the find reset user function');
      var request = {token: token};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);

      $.ajax({
        context: this,
        url: '/findresetuser', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log('Auth says find reset ajax was good');
          console.log('The data in the response is');
          console.log(data);
          if (cb) cb(data.user);
        },
        function (data)  {
          console.log('Auth says find reset ajax was bad');
          console.log('The data in the response is');
          console.log(data);
          if (cb) cb(false);
        }
        );
    },

    resetPass(token, pass, cb) {
      //this.onChange();
      console.log('im in the reset password function');
      var request = {token: token, password: pass};
      cb = arguments[arguments.length - 1];

      console.log('i got to the ajax call');
      console.log(request);
      $.ajax({
        context: this,
        url: '/resetpassword', 
        type: 'POST', 
        contentType:'application/json',
        data: JSON.stringify(request),
        dataType: 'json'
      })
      .then(function (data)  {
          console.log('data from reset pass');
          console.log(data);
          if (cb) cb(true,'');
        },
        function (data)  {

          console.log('data from reset pass failure');
          console.log(data);
          if (cb) cb(false,data.responseJSON.message);
        }
        );
      console.log('i finished the ajax call');
    },

    getToken() {
      return (typeof window !== "undefined") ? localStorage.token : undefined;
    },

    logout(cb) {
      console.log('client side logging out');
      $.ajax({
        context: this,
        url: '/logout', 
        type: 'GET', 
        dataType: 'json'
        })
        .then((g) => {
          console.log('we should be logging out now.')
          delete localStorage.token;
          //if (cb) cb();
          this.onChange(false);
          if (cb) cb();
        });

        /*.catch((err) => {
          console.log("we had an error logging out");
          console.log(err);
        });*/
    },

    loggedIn() {
      return !!((typeof window !== "undefined") ? localStorage.token : undefined)
    },

    onChange() {console.log('default onChange')}
}