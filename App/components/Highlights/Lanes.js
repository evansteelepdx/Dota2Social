import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Image,
	Text,
	View,
	Button,
	Linking,
} from 'react-native';
import heroes from 'dotaconstants/build/heroes.json';

const ODOTA_API = "https://api.opendota.com";

const laneStory = (match, lane, laneName) => {
	return (
		<Text>{laneName}</Text>
	);
}

class Lanes extends React.Component{
	render() {
		const {match} = this.props
		return (
			<View>
				{laneStory(match, 1, "Mid")}
			</View>
		);
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(Lanes);