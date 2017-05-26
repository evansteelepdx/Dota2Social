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
		const { isLoggedIn, dispatch, steam } = this.props;
		return (
			<View>
			</View>
		);

	}
}

const mapStateToProps = state => ({
	steam: state.auth.steamInfo,
	OpenDota: state.dota.stats
});

export default connect(mapStateToProps)(OpenDota);
