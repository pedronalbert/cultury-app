/* Dependencies */
import React, {
  Component
} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

/* Components */
import NavBar from './components/NavBar';

class ArticlesListScene extends Component {
  render () {
    return <View>
      <NavBar />
    </View>
  }
}

const styles = StyleSheet.create({

});

export default ArticlesListScene;
