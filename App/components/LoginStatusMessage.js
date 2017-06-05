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

})
class LoginStatusMessage extends React.Component{
	componentWillMount(){
		if(this.props.isLoggedIn == true){
			fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + secrets.STEAM_API_KEY + "&steamids=" + this.props.steam.ID)
				.then((response) => response.json())
				.then((responseJson) => {
					this.props.onSteamInfo(responseJson);
				})
				.catch((error) => {
					console.error(error);
				});

		}
	}
	render() {
		const { isLoggedIn, dispatch, steam, onSteamInfo, onProfileButton } = this.props;

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
			<View>
			{isLoggedIn ? ( 
				<Button
				title="My Matches"
				onPress={onProfileButton}
				/>
			) : (
				<Text>Please log in!</Text>
			)}
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
		dispatch({type:'SteamInfo', data: steamInfo.response.players[0]})
	},
	onProfileButton:() =>{
		dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusMessage);
