import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	Image,
	View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import AuthButton from './AuthButton';
import renderIf from './utils/renderIf';
import * as secrets from './utils/secrets';

import bigInt from './bigInt';

const styles = StyleSheet.create({
	container: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',

	},
	buttons: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	}

})
class LoginStatusMessage extends React.Component{
	componentWillMount(){
		if(this.props.isLoggedIn == true){
			this.props.onSteamInfo(this.props.steam.ID);	
		}
	}
	componentWillReceiveProps(nextProps){
		if (typeof nextProps.steam.name == "undefined" && nextProps.isLoggedIn == true){
			this.props.onSteamInfo(nextProps.steam.ID);
		}
	}
	render() {
		const {showPreferences, isLoggedIn, dispatch, steam, onSteamInfo, onProfileButton } = this.props;

		return (
			<View>
			{renderIf(isLoggedIn,
				<View style={styles.container}>
				<View>
				<Image
				style={{width: 100, height: 100}}
				source={{uri: steam.image}}
				/>
				</View>
				<Text>{"Welcome, " + steam.name + "(" + steam.ID  + ")"}</Text>

				</View>
			)}
			<View style={styles.buttons}>
			{isLoggedIn? ( 
				<Button
				title="My Matches"
				onPress={onProfileButton}
				/>
			) : (
				<Text>No Valid Login Detected</Text>
			)}
			<Button
		title="Preferences"
		onPress={showPreferences}
			/>
			<AuthButton/>
			</View>
			</View>
	);

	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.steamLoggedIn,
	steam: state.auth.steamInfo
});

const mapDispatchToProps = dispatch => ({
	onSteamInfo: (steamInfo) =>{
		fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + secrets.STEAM_API_KEY + "&steamids=" + steamInfo)
			.then((response) => response.json())
			.then((responseJson) => {
				dispatch({type:'SteamInfo', data: responseJson.response.players[0]})
			})
			.catch((error) => {
				console.error(error);
			});
	},
	onProfileButton:() =>{
		dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
	},
	showPreferences:() =>{
		dispatch(NavigationActions.navigate({ routeName: 'preferences' }))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusMessage);
