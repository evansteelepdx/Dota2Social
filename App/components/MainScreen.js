import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class MainScreen extends React.Component{
	render(){
		return(
			<View style={styles.container}>
			<LoginStatusMessage />
			</View>

		);
	}
}

MainScreen.navigationOptions = {
	title: 'Home Screen',
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
