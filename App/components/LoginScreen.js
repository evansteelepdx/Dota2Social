import React, { PropTypes } from 'react';
import { connect  } from 'react-redux';
import { WebView } from 'react-native';

import urlParse from 'url-parse';

const steam_uri = "https://steamcommunity.com/openid/login?" +
	"openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&" +
	"openid.identity=http://specs.openid.net/auth/2.0/identifier_select&" +
	"openid.mode=checkid_setup&" +
	"openid.ns=http://specs.openid.net/auth/2.0&" +
	"openid.realm=https://dota2social&" +
	"openid.return_to=https://dota2social/signin/";

class LoginScreen extends React.Component{
	componentWillMount(){
		if(this.props.isLoggedIn){
			this.props.navigation.dispatch({type: 'Login'});
		}
	}
	render(){
		const {navigation, onMessage, onError, isLoggedIn} = this.props
		return (
			<WebView
			source={{uri: steam_uri}}
			onNavigationStateChange={onMessage}
			renderError={e=>{
				navigation.dispatch({ type: 'Login'  })
			}}
			/>

		)
	}
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));

}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.steamLoggedIn
});

LoginScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
	onMessage: (message) =>{
		const parsedUrl = getParameterByName('openid.identity', message.url);
		if (parsedUrl != null){
			if (!(parsedUrl.includes("identifier_select"))){
				dispatch({type: 'SteamLogin', data: parsedUrl})
			}
		}
	}
});


LoginScreen.navigationOptions = {
	title: 'Log In',
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
