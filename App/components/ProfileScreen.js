import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Button,
	Image,
	AsyncStorage,
} from 'react-native';

import bigInt from './utils/bigInt';
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
	static navigationOptions = ({ navigation, screenProps  }) => ({
		title:"Recent Matches",
	});
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
			AsyncStorage.getItem("numMatches").then((value) =>{
				if (value != null){
					this.props.updateDota(nextProps.dota.openDotaID, value);
				}else{
					this.props.updateDota(nextProps.dota.openDotaID, "20");
				}
			})
		}
	}
	render(){
		const {navigation, reloadDota, matchDetails, steam, updateID, dota, prefs} = this.props;
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
				<View>
				<Button
				title="Reload"
				onPress={() =>{
					reloadDota(dota.openDotaID, prefs.numMatches)
				}}
				/>
				</View>
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


const mapStateToProps = state => ({
	steam: state.auth.steamInfo,
	dota: state.dota,
	prefs: state.preferences
});

const mapDispatchToProps = dispatch => ({
	updateID: (newID) => {
		dispatch({type: 'updateDotaID', data: newID})
	},
	reloadDota: (openDotaID,numMatches) =>{
		dispatch({type: 'startLoading'})
		fetch('https://api.opendota.com/api/players/'+openDotaID+'/matches?limit=' + numMatches)
			.then((response) => response.json())
			.then((response) =>{
				dispatch({type: 'recentDotaMatches', array: response})
				dispatch({type: 'finishLoading'})
			})
	},
	matchDetails: (match, navigation) => {
		const navigateAction = NavigationActions.navigate({
			routeName: 'dotaMatch',
			params: {matchObject:match},
			action: NavigationActions.navigate({ routeName: 'dotaMatch' })
		})
		navigation.navigation.dispatch(navigateAction);
	},
	updateDota: (openDotaID, numMatches) =>{
		fetch('https://api.opendota.com/api/players/'+openDotaID+'/matches?limit=' + numMatches)
			.then((response) => response.json())
			.then((response) =>{
				dispatch({type: 'recentDotaMatches', array: response})
				dispatch({type: 'finishLoading'})
			})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
