import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps','Warning: componentWillMount','Warning: "NoteObject"','Warning: "NoteDetail"']);
AppRegistry.registerComponent(appName, () => App);