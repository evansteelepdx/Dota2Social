import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

class OpenDota extends React.Component{
	render() {
		const { isLoggedIn, dispatch } = this.props;
		var payments = [];
		for(let i = 0; i < noGuest; i++){
			payments.push(
				<View key = {i}>
				<View>
				<TextInput />
				</View>
				<View>
				<TextInput />
				</View>
				<View>
				<TextInput />
				</View>
				</View>
			)
		}
		return (
		);

	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = => ({
})

export default connect(mapStateToProps)(OpenDota);
