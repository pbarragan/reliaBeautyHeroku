var React = require('react');
var ReactDOM = require('react-dom');

//var NavBarC = require('./NavBarC');

var FullscreenC = React.createClass({
  render: function() {
    console.log('FullscreenC: Rendering')
    /*
    var fullscreenStyle = {
      position: 'fixed',  
      padding:0,
      margin:0,

      top:0,
      left:0,

      width: 100,
      height: 100,
  
      backgroundColor: 'white',
      backgroundSize: 'cover',
      backgroundImage: this.state.backgroundImage
    };
    */
    var fullscreenStyle = {};
    if(this.props.backgroundImage){
    fullscreenStyle = {
      backgroundColor: 'black',
      position: 'fixed',  
      padding:0,
      margin:0,
      top:0,
      left:0,
      backgroundSize: 'cover',
      width: "100%",
      height: "100%",
      backgroundImage: 'url('+this.props.backgroundImage+')'
    };
    }
    else if(this.props.backgroundColor){
    fullscreenStyle = {
      backgroundColor: this.props.backgroundColor,
      position: 'fixed',  
      padding:0,
      margin:0,
      top:0,
      left:0,
      backgroundSize: 'cover',
      width: "100%",
      height: "100%"
    };
    }
    else{
    fullscreenStyle = {
      backgroundColor: 'black',
      position: 'fixed',  
      padding:0,
      margin:0,
      top:0,
      left:0,
      backgroundSize: 'cover',
      width: "100%",
      height: "100%"
    };
    }
    /*
    var bgDefaultImg;
    if(this.props.backgroundImage) bgDefaultImg = this.props.backgroundImage;
    else bgDefaultImg = './img/background.jpg';
    var fullscreenStyle = {
      backgroundColor: 'black',
      position: 'fixed',  
      padding:0,
      margin:0,
      top:0,
      left:0,
      backgroundSize: 'cover',
      width: "100%",
      height: "100%",
      backgroundImage: 'url('+bgDefaultImg+')'
    };
*/
    //console.log('FullscreenC: About to map')

    /*
    // Pass the setBackgroundImage function to the children
    var childrenWithProps = React.Children.map(this.props.children, (child) => {
      console.log('FullscreenC: Mapping')

      return React.cloneElement(child, 
          {setBackgroundImage: this.setBackgroundImage}
        );
    });
    */

    //console.log('FullscreenC: About to return');
    //console.log(childrenWithProps);
    return (
      <div style={fullscreenStyle}>
        {this.props.children}
      </div>
      );

  },
  setBackgroundImage: function(sourceString) {
    console.log('FullscreenC: Set new background image.')
    this.setState({backgroundImage: 'url('+sourceString+')'});
  }

});
/*
var styles = StyleSheet.create({
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});
var LandingPage = React.createClass({
  render: function() {
    return (
      <Image source={require('./img/landingPage.jpg')} style={styles.container}>
        ... Your Content ...
      </Image>
    );
}
});
*/
module.exports = FullscreenC;
