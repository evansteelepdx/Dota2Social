import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';


const styles = StyleSheet.create({
	container: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
})


class DotaMatchScreen extends React.Component{
	render(){
		const {match} = this.props.navigation.state.params.matchObject
		return(
			<View style={styles.container}>
			<Text>{"LOL, you died " + match.deaths + " times!"}</Text>
			</View>

		);
	}
}
DotaMatchScreen.navigationOptions = {
	title: 'DotaMatch',
};

export default DotaMatchScreen;
