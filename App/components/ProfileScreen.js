import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import bigInt from './bigInt';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});

class ProfileScreen extends React.Component{
	componentWillMount(){
		bigInt.convertSteamID(
			this.props.steam.ID,
			// error callback
			(msg) => {
				console.log(msg);
			},
			//success callback
			(msg) => {
				this.props.updateID(msg);
			}
		)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.dota.openDotaID != "" && nextProps.dota.matches.length==0){
			this.props.updateDota(nextProps.dota.openDotaID);
			console.log(this.props)
		}
	}
	render(){
		const {steam,updateID,dota} = this.props;
		return(
			<View style={styles.container}>
			<Text>{dota.openDotaID}</Text>
			</View>

		);
	}
}
ProfileScreen.navigationOptions = {
	title: 'Profile',
};

const mapStateToProps = state => ({
	steam: state.auth.steamInfo,
	dota: state.dota
});

const mapDispatchToProps = dispatch => ({
	updateID: (newID) => {
		dispatch({type: 'updateDotaID', data: newID})
	},
	updateDota: (openDotaID) =>{
		fetch('https://api.opendota.com/api/players/'+openDotaID+'/recentMatches')
			.then((response) => response.json())
			.then((response) =>{
				console.log(response);
				dispatch({type: 'recentDotaMatches', array: response})
			})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
