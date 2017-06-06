import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

class OpenDotaList extends React.Component{
	render() {
		const {matches} = this.props
		console.log(this.props)
		return (
			<View>
			<Text>{"Match: " + this.props.matches.match_id}</Text>
			</View>
		);

	}
}

export default OpenDotaList;
