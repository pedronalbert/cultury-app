/* Dependencies */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

/* Components */
import ArticlesListScene from './src/scenes/ArticlesListScene';

class cultury extends Component {
  render () {
    return <Router>
      <Scene key="root">
        <Scene key="articleList" component={ArticlesListScene} initial={true} hideNavBar={true} />
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('cultury', () => cultury);
