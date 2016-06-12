/* Dependencies */
import React, {
  Component,
  PropTypes
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
  constructor (props) {
    super(props);

    this._handlePress = this._handlePress.bind(this);
  }
  render () {
    let { iconName, iconColor, underlayColor, style } = this.props;

    return <TouchableHighlight style={[styles.root, style]} onPress={this._handlePress} underlayColor={underlayColor}>
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
  iconColor: 'white',
  underlayColor: 'rgba(255,255,255,0.25)'
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default IconButton;
