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
import { Provider } from 'react-redux';

/* Components */
import ArticlesListScene from './src/scenes/ArticlesListScene';
import store from './src/redux/store';

class cultury extends Component {
  render () {
    return <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="articlesList" component={ArticlesListScene} initial={true} hideNavBar={true} />
        </Scene>
      </Router>
    </Provider>
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('cultury', () => cultury);
