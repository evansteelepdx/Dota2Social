import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import DotaMatchScreen from '../components/DotaMatchScreen';

export const AppNavigator = StackNavigator({
	Login: { screen: LoginScreen },
	Main: { screen: MainScreen },
	Profile: { screen: ProfileScreen},
	dotaMatch: {screen: DotaMatchScreen},
});

const AppWithNavigationState = ({ dispatch, nav }) => (
	<AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
