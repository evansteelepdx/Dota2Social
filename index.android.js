import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './App/reducers';
import AppWithNavigationState from './App/navigators/AppNavigator';

class ReduxExampleApp extends React.Component {
	store = createStore(AppReducer);

	render() {
		console.disableYellowBox = true;
		return (
			<Provider store={this.store}>
			<AppWithNavigationState />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Dota2Social', () => ReduxExampleApp);

export default ReduxExampleApp;
