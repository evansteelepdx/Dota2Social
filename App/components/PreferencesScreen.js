import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Picker,
	AsyncStorage,
	Image,
} from 'react-native';

import { NavigationActions  } from 'react-navigation'

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
	},
	imageContainer:{
		flex: 1,
		padding: 40,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

class PreferencesScreen extends React.Component{
	componentDidMount(){
		AsyncStorage.getItem("numMatches").then((value) => {
			if (value != null){
				this.props.updateNumMatches(value);
			}
		}).done();
	}
	render(){
		const {prefs, updateNumMatches} = this.props
		var rows = [];
		for (var i=1; i < 21; i++) {
			rows.push(i.toString());
		}
		return(
			<View>
			<View>
			<Text>Number of matches to show</Text>
			</View>
			<Picker
			selectedValue={prefs.numMatches}
			onValueChange={(itemValue, itemIndex) => updateNumMatches(itemValue)}
			>
			{rows.map((item, index) => {
				return (<Picker.Item label={item} value={index+1} key={index}/>) 
			})}
			</Picker>
			<View>
			<Text>{"Current selection: " + prefs.numMatches}</Text>
			</View>
			</View>

	);
	}
}

PreferencesScreen.navigationOptions = {
	title: 'Preferences',
};

const mapStateToProps = state => ({
	prefs: state.preferences
});

const mapDispatchToProps = dispatch => ({
	updateNumMatches: (numMatches) =>{
		AsyncStorage.setItem("numMatches", numMatches.toString())
		dispatch({type: 'updateNumMatches', data:numMatches})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);
