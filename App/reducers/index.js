import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

var RNFS = require('react-native-fs');


// Start with two routes: The Main screen, with the Login screen on top.
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
			nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
			break;
		default:
			nextState = AppNavigator.router.getStateForAction(action, state);
			break;
	}

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
}

function getSteamAuth(){
	var path = RNFS.DocumentDirectoryPath + '/test.txt';

	return RNFS.unlink(path)
		.then(() => {
			console.log('FILE DELETED');

		})
		.catch((err) => {
			console.log(err.message);
		});
}

const steamResult = getSteamAuth();
const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
	switch (action.type) {
		case 'Login':
			return { ...state, isLoggedIn: true };
		case 'Logout':
			return { ...state, isLoggedIn: false };
		default:
			return state;
	}
}

const initialSteamAuthState = {steamData: []};

function steamAuth(state = initialSteamAuthState, action){
	switch (action.type){
		case 'SteamAuth':
			return {...state, steamData: action.data}
		default:
			return state;
	}
}

const AppReducer = combineReducers({
	nav,
	auth,
	steamAuth
});

export default AppReducer;
