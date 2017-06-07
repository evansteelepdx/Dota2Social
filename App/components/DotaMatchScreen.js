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
})


const playerRow = (player) => (
	<View>
		<View>
			<Image source={`${ODOTA_API}${heroes[player.hero_id].img}`}/>
		</View>
		<View>
			<Text>{player.personaname}</Text>
		</View>
	</View>
);


class DotaMatchScreen extends React.Component{
	componentDidMount() {
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
		console.log(`${ODOTA_API}${heroes[match ? "34" : "86"].img}`);
		return(
			<View style={styles.container}>
				<Image
					style={{width: 100, height: 100}}
					source={{ uri: `${ODOTA_API}${heroes[currentMatch ? currentMatch.players[0].hero_id : "86"].img}` }}
					/>
			</View>
		);
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
