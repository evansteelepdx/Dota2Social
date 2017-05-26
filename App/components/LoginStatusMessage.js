import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import AuthButton from './AuthButton';

const styles = StyleSheet.create({
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});

class LoginStatusMessage extends React.Component{
	render() {
		const { isLoggedIn, dispatch, steam } = this.props;
		return (
			<View>
			{isLoggedIn ?
			<Button
			onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))}
			title="Profile"
			/>
			:
				<Text>LUL</Text>
			}
			<AuthButton/>
			</View>
		);

	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.steamLoggedIn,
	steam: state.auth.steamInfo
});

export default connect(mapStateToProps)(LoginStatusMessage);
