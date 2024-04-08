/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Em làm bình thường thì cứ chạy App nha
// TestApp để chị đang test firebase authen thôi

AppRegistry.registerComponent(appName, () => App);
