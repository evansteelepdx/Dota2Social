import React from 'react';
import {connect} from 'react-redux';
import {
	StyleSheet,
	Image,
	Text,
	View,
	Button,
	Linking,
} from 'react-native';
import {
	formatTemplate,
	formatList,
	styles
} from './BaseHighlights.js';
import heroes from 'dotaconstants/build/heroes.json';

// Lane logic taken mostly from my work on opendota's ui

const ODOTA_API = "https://api.opendota.com";


const PlayerSpan = player => {
	return [<Image 
				style={{width: 48, height: 48}}
				source={{ uri: `${ODOTA_API}${heroes[player.hero_id].icon}` }}
				/>, heroes[player.hero_id].localized_name];
}


class JungleStory {
  constructor(match) {
    this.players = match.players.filter(player => (player.lane === 4 || player.lane === 5) && !player.is_roaming);
    this.lane = 4;
  }
  static exists(match) {
    return match.players.filter(player => (player.lane === 4 || player.lane === 5) && !player.is_roaming).length > 0;
  }
  format() {
    return formatTemplate("{players} farmed the jungle", {
      players: formatList(this.players.map(PlayerSpan)),
    });
  }
}

class RoamStory {
  constructor(match) {
    this.players = match.players.filter(player => player.is_roaming);
    this.lane = 6;
  }
  static exists(match) {
    return match.players.filter(player => player.is_roaming).length > 0;
  }
  format() {
    return formatTemplate("{players} roamed", {
      players: formatList(this.players.map(PlayerSpan)),
    });
  }
}

const localizedLane = {
	1: "Bot",
	2: "Mid",
	3: "Top",
};

const getLaneScore = players => (Math.max(...players.map(player => player.gold_t[10] || 0)) || 0);
const laneScoreDraw = 500;

class LaneStory {
	constructor(match, lane) {
		this.radiant_players = match.players.filter(player => player.lane == parseInt(lane, 10) && player.isRadiant && (!player.is_roaming));
		this.dire_players = match.players.filter(player => player.lane == parseInt(lane, 10) && !player.isRadiant && (!player.is_roaming));
		this.lane = lane;
		this.winning_team = getLaneScore(this.radiant_players) > getLaneScore(this.dire_players);
		this.is_draw = Math.abs(getLaneScore(this.radiant_players) - getLaneScore(this.dire_players)) <= laneScoreDraw;
	}
	format() {
		// If there is nobody in this lane
		if (this.radiant_players.length === 0 && this.dire_players.length === 0) {
			return formatTemplate("there was nobody in {lane} lane", {
				lane: localizedLane[this.lane],
			});
		}
		// If only one team is in this lane
		if (this.radiant_players.length === 0 || this.dire_players.length === 0) {
			return formatTemplate("{players} had a free {lane} lane", {
				players: formatList(this.radiant_players.concat(this.dire_players).map(PlayerSpan)),
				lane: localizedLane[this.lane],
			});
		}
		// If both teams are in this lane

		// If it's close enough to be a draw
		if (this.is_draw) {
			return formatTemplate("{radiant_players} drew even in {lane} Lane with {dire_players}", {
				radiant_players: formatList(this.radiant_players.map(PlayerSpan), "nobody"),
				dire_players: formatList(this.dire_players.map(PlayerSpan), "nobody"),
				lane: localizedLane[this.lane],
			});
		}

		// If one team won
		return formatTemplate(this.winning_team ? "{radiant_players} won {lane} Lane against {dire_players}" : "{radiant_players} lost {lane} Lane to {dire_players}", {
			radiant_players: formatList(this.radiant_players.map(PlayerSpan), "nobody"),
			dire_players: formatList(this.dire_players.map(PlayerSpan), "nobody"),
			lane: localizedLane[this.lane],
		});
	}
}

class Lanes extends React.Component {
	render() {
		const {match} = this.props
		const lanes = Object.keys(localizedLane).map(lane => new LaneStory(match, lane));
		if (JungleStory.exists(match)) {
		  lanes.push(new JungleStory(match));
		}
		if (RoamStory.exists(match)) {
		  lanes.push(new RoamStory(match));
		}
		return (
			<View style={styles.highlight}>
				<View>
					<Text style={styles.header}>Lanes:</Text>
				</View>
				{lanes.map(lane => 
					<View key={lane.lane}>
						<Text>{lane.format()}</Text>
					</View>)
				}
			</View>
		);
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps,mapDispatchToProps)(Lanes);