var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');

var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');

var SignupC = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  	},
	getInitialState: function() {
    	return {
      	error: false,
      	errorMessage: ''
    	}
  	},
	submitSignup: function(e){
    	console.log('I am trying to sign up');
      e.preventDefault();

    	//console.log(this.refs.email.getValue());
    	//console.log(this.refs.password.getValue());

		if(this.refs.password.getValue() === this.refs.confirm.getValue()){
			if(this.refs.password.getValue().length > 0){
    			auth.signup(this.refs.email.getValue(), 
    				this.refs.password.getValue(), 
    				(signupWorked,message) => {
      				if (!signupWorked) console.log("Signup Failed");
      				else console.log("Signup succeeded");

      			if (!signupWorked)
        			return this.setState({ error: true , errorMessage: message})

      			const { location } = this.props
      			console.log(location);
      			console.log(location.state);
      			console.log('WHY IS NOTHING WORKING!!!!');
      			//console.log(location.state.nextPathname);
      			if (location.state && location.state.nextPathname) {
      				console.log('i am in the nextPathName');
      				this.context.router.replace(location.state.nextPathname)
      			} else {
      				console.log('i am in the index');
      				this.context.router.replace('/index')
      			}
      		});

    			console.log('got past the signup call');
    		}
    		else{
    			this.setState({ error: true, 
    			errorMessage: "Oops! Your password is too short." });
    		}
    	}
    	else{
    		this.setState({ error: true, 
    			errorMessage: "Oops! Please make sure your confirmed password matches." });
    	}
  	},
	render: function(){

		return (
      <div><h1>Sign up for a free account</h1>
			<form onSubmit={this.submitSignup}>
            <Input type="email" ref="email" placeholder="Email" required/>
            <Input type="password" ref="password" placeholder="Password" required/>
            <Input type="password" ref="confirm" placeholder="Confirm Password" required/>
            <div>
            	<ButtonInput type="submit" value="Sign Up"
            		bsSize="large" />
            </div>
            <div style={{color:"red"}}>
            {this.state.error ? this.state.errorMessage : ''}
            </div>
          	</form></div>

		);
	}

});

//{this.state.error ? this.state.errorMessage : 'No error'}
module.exports = SignupC;
