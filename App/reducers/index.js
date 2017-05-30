import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

import * as secrets from '../components/utils/secrets'

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
	steamLoggedIn: true, 
	steamInfo: {
		ID: "76561198002007932"
	},
	facebookLoggedIn: false,
	facebookInfo: [],
	twitterLoggedIn: false,
	twitterInfo: []
};

function auth(state = AuthState, action) {
	switch (action.type) {
		case 'SteamInfo':
			let steamInfoObject = {
				ID: action.data.steamid,
				name: action.data.personaname,
				image: action.data.avatarmedium
			};
			return {
				...state,
				steamInfo: steamInfoObject
			};
		case 'SteamLogin':
			var url = action.data
			var page = url.substring(url.lastIndexOf('/') + 1);
			let steamObject = {
				ID: page
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
