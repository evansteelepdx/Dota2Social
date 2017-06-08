import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import heroes from 'dotaconstants/build/heroes.json';

const ODOTA_API = "https://api.opendota.com";

const styles = StyleSheet.create({
	container: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	table: {
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


const playerRow = (player) => (
	<View style={styles.row} key={player.player_slot}>
		<View key={"image"}>
			<Image 
				style={{width: 64, height: 36}}
				source={{ uri: `${ODOTA_API}${heroes[player.hero_id].img}` }}/>
		</View>
		<View key={"name"}>
			<Text style={styles.nameText}>{player.personaname || "Anonymous"}</Text>
		</View>
	</View>
);


class DotaMatchScreen extends React.Component{
	componentWillMount() {
		const { match } = this.props.navigation.state.params.matchObject;
		fetch(`${ODOTA_API}/api/matches/${match.match_id}`)
			.then((response) => response.json())
			.then((response) => {
				this.props.setCurrentMatch(response);
			})
	}
	render(){
		const { match } = this.props.navigation.state.params.matchObject
		const { currentMatch } = this.props
		if (currentMatch.players) {
			return(
				<View style={styles.table}>
					{currentMatch.players.map(playerRow)}
				</View>
			);
		}
		else {
			return(
				<View style={styles.container}>
					<Text>Not quite ready yet</Text>
				</View>
			);
		}
	}
}
DotaMatchScreen.navigationOptions = {
	title: 'DotaMatch',
};

const mapDispatchToProps = dispatch => ({
	setCurrentMatch: (match) => {
		dispatch({type: 'currentMatch', match: match});
	}
})

const mapStateToProps = state => ({
	currentMatch: state.dota.currentMatch
})

export default connect(mapStateToProps, mapDispatchToProps)(DotaMatchScreen);
