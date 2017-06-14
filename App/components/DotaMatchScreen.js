import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Button,
	Linking,
} from 'react-native';
import heroes from 'dotaconstants/build/heroes.json';
import Lanes from './Highlights/Lanes.js';

import toast from './utils/toast';
import database from './utils/database';

const ODOTA_API = "https://api.opendota.com";

const styles = StyleSheet.create({
	container: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	column: {
		alignItems: 'flex-start',
		flexDirection: 'column',
	},
	row: {
		alignItems: 'flex-start',
		flexDirection:'row',
	},
	nameText: {
		textAlignVertical: 'center',
		fontSize: 20,
		paddingLeft: 5,
	}
})

// Lane logic taken mostly from my work on opendota's ui

const playerRow = (player) => (
	<View style={styles.row} key={player.player_slot}>
		<View key={"image"}>
			<Image 
				style={{width: 64, height: 36}}
				source={{ uri: `${ODOTA_API}${heroes[player.hero_id].img}` }}
				/>
		</View>
		<View key={"name"}>
			<Text style={styles.nameText}>
				{player.personaname || "Anonymous"}
			</Text>
		</View>
	</View>
);


class DotaMatchScreen extends React.Component{
	static navigationOptions = ({ navigation  }) => ({
		title: `Match ${navigation.state.params.matchObject.match.match_id}`,
	});
	componentWillMount() {
		this.props.resetCurrentMatch();
		const { match } = this.props.navigation.state.params.matchObject;
		database.fetchDatabase(
			match.match_id.toString(),
			// error callback
			(msg) => {
				console.log("There was an error: " + msg);
			},
			//success callback
			(msg) => {
				if (msg == ""){
					// We need to fetch!
					fetch(`${ODOTA_API}/api/matches/${match.match_id}`)
					.then((response) => response.json())
					.then((response) => {
						console.log("Aw man, I had to fetch something!");
						database.createDatabase(
							match.match_id.toString(),
							JSON.stringify(response),
							// error callback
							(msg) => {
								console.log("There was an error: " + msg);
							},
							//success callback
							(msg) => {
								toast.show(msg, toast.SHORT);
							}
						)
						this.props.setCurrentMatch(response);
					})
				}else{
					toast.show("Match " + match.match_id.toString() + " retrieved from database", toast.SHORT);
					this.props.setCurrentMatch(JSON.parse(msg));
				}
			}
		)
}
	render(){
		const { match } = this.props.navigation.state.params.matchObject
		const { currentMatch, navigation } = this.props
		if (currentMatch.players) {
			return(
				<View style={styles.column}>
					<View style={styles.row}>
						<View>
							<Button
								title="OpenDota"
								color="4091d8"
								onPress={(() => Linking.openURL(`http://www.opendota.com/matches/${currentMatch.match_id}`))}
								/>
							<Button
								title="DotaBuff"
								color="ed3b1c"
								onPress={(() => Linking.openURL(`http://www.dotabuff.com/matches/${currentMatch.match_id}`))}
								/>
						</View>
					</View>
					<View style={styles.column}>
						{currentMatch.players.map(playerRow)}
					</View>
					<Lanes match={currentMatch} />
				</View>
			);
		}
		else {
			return(
				<View style={styles.container}>
					<Image
						style={{width:100, height:100}}
						source={require('../resources/images/loading.gif')}
						/>
				</View>
			);
		}
	}
}

const mapDispatchToProps = dispatch => ({
	setCurrentMatch: (match) => {
		dispatch({type: 'currentMatch', match: match});
	},
	resetCurrentMatch: () => {
		dispatch({type: 'clearMatch'})
	}
})

const mapStateToProps = state => ({
	currentMatch: state.dota.currentMatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DotaMatchScreen);
