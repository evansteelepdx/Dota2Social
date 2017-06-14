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
import {
	formatTemplate,
	formatList,
	styles
} from './BaseHighlights.js';


class Stats extends React.Component {
	render() {
		const { player } = this.props;
		return (
			<View style={styles.highlight}>
				<Text style={styles.header}>Stats:</Text>
				<Text>KDA: {player.kills}/{player.deaths}/{player.assists}</Text>
				<Text>GPM: {player.gold_per_min}</Text>
				<Text>Hero Damage: {player.hero_damage}</Text>
				<Text>Tower Damage: {player.tower_damage}</Text>
			</View>
		);
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps,mapDispatchToProps)(Stats);