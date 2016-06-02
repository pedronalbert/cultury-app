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
import IconButton from '../../../components/IconButton';

class NavBar extends Component {
  render () {
    return <View style={styles.root}>
      <IconButton style={styles.menuButton}/>
      <Text style={styles.title}>Artículos</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  root: {
    height: 56,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },

  menuButton: {
    marginRight: 16
  },

  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default NavBar;
