import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

var styles = StyleSheet.create({
	item: {
		      flexDirection: 'row',
		      justifyContent: 'space-between',
		      alignItems: 'center',
		      padding: 30,
		      margin: 2,
		      borderColor: '#2a4944',
		      borderWidth: 1,
		      backgroundColor: '#d2f7f1'
		   
	}
})

class OpenDotaList extends React.Component{
	render() {
		const {matches, openMatchDetails} = this.props
		return (
			<View style={styles.item}>
			<Text>{"Match: " + this.props.matches.match_id}</Text>
			</View>
		);

	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(OpenDotaList);
