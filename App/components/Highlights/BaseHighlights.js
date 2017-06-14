import {
	StyleSheet,
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Button,
	Linking,
} from 'react-native';


export const formatTemplate = (template, dict) => {
	if (!template) {
		return ["invalid template"];
	}
	const pattern = /(\{[^}]+\})/g;
	let result = template.split(pattern);
	for (let i = 0; i < result.length; i += 1) {
		if (result[i].match(pattern) && result[i].slice(1, -1) in dict) {
			result[i] = dict[result[i].slice(1, -1)];
		}
	}
	result = result.filter(part => part !== '');
	return result;
};

// Enumerates a list of items using the correct language syntax
export const formatList = (items, noneValue = []) => {
	switch (items.length) {
		case 0:
			return noneValue;
		case 1:
			return items;
		case 2:
			return formatTemplate("{0} and {1}", { 0: items[0], 1: items[1] });
		case 3:
			return formatTemplate("{0}, {1}, and {2}", { 0: items[0], 1: items[1], 2: items[2] });
		default:
			return formatTemplate("{0}, {rest}", { 0: items.shift(), rest: formatList(items) });
	}
};

export const styles = StyleSheet.create({
	highlight: {
		marginTop: 10,
		backgroundColor: '#f5fcff',
	},
	header: {
		fontSize: 20,
	}
})