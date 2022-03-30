/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import GamePlay from './src/components/GamePlay';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
