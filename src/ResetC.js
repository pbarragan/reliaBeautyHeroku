var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var auth = require('./../app/authentication');

var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonInput  = require('react-bootstrap/lib/ButtonInput');

var ResetC = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  	},
	getInitialState: function() {
    	return {
      	error: false,
        errorMessage: '',
        tokenError: true,
      	userEmail: ''
    	}
  	},

  componentWillMount: function() {
    console.log('URL params');
    console.log(this.props.params);
    auth.findResetUser(this.props.params.token, 
      (user) => {
        if (!user) console.log("Didn't find a user");
        else console.log("Found a user");

        if (!user)
          return this.setState({ tokenError: true });
        else return this.setState({tokenError: false, userEmail: user.local.email });

        /*
        const { location } = this.props
        console.log(location);
        console.log(location.state);
        console.log('WHY IS NOTHING WORKING!!!!');
        if (location.state && location.state.nextPathname) {
          console.log('i am in the nextPathName');
          this.context.router.replace(location.state.nextPathname)
        } else {
          console.log('i am in the index');
          this.context.router.replace('/index')
        }
        */
      });
  },

	submitReset: function(e){
    	console.log('I am trying to reset the password');
    e.preventDefault();

		if(this.refs.password.getValue() === this.refs.confirm.getValue()){
			if(this.refs.password.getValue().length > 0){
    			auth.resetPass(this.props.params.token,
    				this.refs.password.getValue(), 
    				(resetWorked,message) => {
      				if (!resetWorked) console.log("Reset Failed");
      				else console.log("Reset succeeded");

      			if (!resetWorked)
        			return this.setState({ error: true,
              errorMessage: message })

      			const { location } = this.props
      			console.log(location);
      			console.log(location.state);
      			console.log('WHY IS NOTHING WORKING!!!!');
      			//console.log(location.state.nextPathname);
      			if (location && location.state && location.state.nextPathname) {
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
      <div>
      {this.state.tokenError ? <p>Sorry, this link is no longer valid</p> :
        <div><h1> Hi, {this.state.userEmail}. Reset your password</h1>
			<form onSubmit={this.submitReset}>
            <Input type="password" ref="password" placeholder="Password" required/>
            <Input type="password" ref="confirm" placeholder="Confirm Password" required/>
            <div>
            	<ButtonInput type="submit" value="Reset"
            		bsSize="large" />
            </div>
            <div style={{color:"red"}}>
            {this.state.error ? this.state.errorMessage : ''}
            </div>
          	</form>
      </div>
      }</div>
		);
	}

});

//{this.state.error ? this.state.errorMessage : 'No error'}
module.exports = ResetC;
