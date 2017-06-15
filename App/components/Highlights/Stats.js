import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Image,
	Text,
	View,
	Button,
	TouchableOpacity,
	Linking,
} from 'react-native';
import {
	formatTemplate,
	formatList,
	styles,
	HighlightBase
} from './BaseHighlights.js';


export default class Stats extends HighlightBase {
	constructor(player) {
		super();
		this.title = "Stats";
		this.data = [
			`KDA: ${player.kills}/${player.deaths}/${player.assists}`,
			`GPM: ${player.gold_per_min}`,
			`Hero Damage: ${player.hero_damage}`,
			`Tower Damage: ${player.tower_damage}`
		];
	}
	text() {
		return this.data.join("\n");
	}
	render() {
		return (
			<TouchableOpacity 
				key={this.title}
				onPress={this.share_func()}
				style={styles.highlight}>
				<Text style={styles.header}>Stats:</Text>
				{this.data.map(text => <Text>{text}</Text>)}
			</TouchableOpacity>
		);
	}
}