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
    let handlePressMenuButton = this._handlePressMenuButton.bind(this);

    return <View style={styles.root}>
      <IconButton style={styles.menuButton} onPress={handlePressMenuButton} />
      
      <Text style={styles.title}>Artículos</Text>
    </View>
  }

  _handlePressMenuButton () {
    if (this.props.onPressMenuButton) {
      return this.props.onPressMenuButton();
    }
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
