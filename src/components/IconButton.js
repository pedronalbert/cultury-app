/* Dependencies */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* Components */

class IconButton extends Component {
  render () {
    let { iconName, iconColor, underlayColor, style } = this.props;
    let handlePress = this._handlePress.bind(this);

    return <TouchableHighlight style={[styles.root, style]} onPress={handlePress} underlayColor={underlayColor}>
      <View>
        <Icon name={iconName} size={26} color={iconColor} />
      </View>
    </TouchableHighlight>
  }

  _handlePress () {
    if (this.props.onPress) {
      return this.props.onPress();
    }
  }
}

const styles = StyleSheet.create({
  root: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

IconButton.defaultProps = {
  iconName: 'menu',
  iconColor: 'white',
  underlayColor: 'rgba(255,255,255,0.5)'
};

export default IconButton;
