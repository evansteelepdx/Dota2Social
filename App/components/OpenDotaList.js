import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	StyleSheet,
	Text,
	Image,
	View,
} from 'react-native';
import heroes from 'dotaconstants/build/heroes.json';

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

	},
	win:{
		backgroundColor: '#d2f7f1'
	},
	loss:{
		backgroundColor: '#e5293c'
	},
})

const ODOTA_API = "https://api.opendota.com";

function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	if (a.getMinutes() < 10 ){
		min = '0' + a.getMinutes()
	}
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
	return time;

}

class OpenDotaList extends React.Component{
	render() {
		const {matches, openMatchDetails} = this.props
		return (
			
			<View style={styles.item}>
			<Text>{"Match: " + timeConverter(this.props.matches.start_time)}</Text>
			<View>
			<Image
			style={{width: 64, height: 60}}
			source={{uri: `${ODOTA_API}${heroes[this.props.matches.hero_id].img}`}}/>
			</View>
			<Text>LUL</Text>
			</View>
		);

	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(OpenDotaList);
