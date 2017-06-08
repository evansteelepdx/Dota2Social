import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Image,
} from 'react-native';

import bigInt from './bigInt';
import OpenDotaList from './OpenDotaList'

import { NavigationActions  } from 'react-navigation'

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
	},
	imageContainer:{
		flex: 1,
		padding: 40,
		justifyContent: 'center',
		alignItems: 'center',
	}
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
		}
	}
	render(){
		const {navigation, matchDetails, steam, updateID, dota} = this.props;
		return(
			<View>
			{dota.isFetching ? (
				<View style={styles.imageContainer}>
				<Image
				style={{width:100, height:100}}
				source={require('../resources/images/loading.gif')}
				/>
				</View>
			) : (
				<View style={styles.container}>
				<ScrollView>
				{dota.matches.map(match => (
					<TouchableOpacity
					onPress={
						() => matchDetails({match}, {navigation})		
					}
					key={match.match_id}
					>
					<View>
					<OpenDotaList
					matches={match}
					/>
					</View>
					</TouchableOpacity>
				))}
				</ScrollView>
				</View>
			)}
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
	matchDetails: (match, navigation) => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'dotaMatch',
			params: {matchObject:match},
			action: NavigationActions.navigate({ routeName: 'dotaMatch' })
		})
		navigation.navigation.dispatch(navigateAction);
	},
	updateDota: (openDotaID) =>{
		fetch('https://api.opendota.com/api/players/'+openDotaID+'/recentMatches')
			.then((response) => response.json())
			.then((response) =>{
				dispatch({type: 'recentDotaMatches', array: response})
				dispatch({type: 'finishLoading'})
			})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
