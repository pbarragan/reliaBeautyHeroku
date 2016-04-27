// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'secret':'reliasnapbeautybella'
    ,
    'facebookAuth' : {
        'clientID'        : '260098477669182', // your App ID
        'clientSecret'    : 'bf5e0e535bf754bca5fb7d3216a05dc8', // your App Secret
        'callbackURL'     : 'http://www.snapbella.com/auth/facebook/callback'
    }
/*,
    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }
*/
};
