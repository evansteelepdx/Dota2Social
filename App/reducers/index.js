import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

var RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath + '/steamauth.txt';


// Which route comes first depends on if we are authenticated or not:
// hence why we've encapsulated this process in a promise

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

function nav(state = initialNavState, action) {
	let nextState;
	switch (action.type) {
		case 'Login':
			nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
			break;
		case 'Logout':
			nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Main' }), state);
			break;
	default:
			nextState = AppNavigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

const AuthState = { 
	steamLoggedIn: false, 
	steamInfo: {},
	facebookLoggedIn: false,
	facebookInfo: [],
	twitterLoggedIn: false,
	twitterInfo: []
};

function auth(state = AuthState, action) {
	switch (action.type) {
		case 'SteamLogin':
			let steamObject = {
				ID: action.data
			};
			return { 
				...state, 
				steamLoggedIn: true,
				steamInfo: steamObject
			};
		case 'SteamLogout':
			return { 
				...state, 
				steamLoggedIn: false ,
				steamInfo: {}	
				};
		default:
			return state;
	}
}

const DotaState = {

}

const AppReducer = combineReducers({
	nav,
	auth
});

export default AppReducer;
