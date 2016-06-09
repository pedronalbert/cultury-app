/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  MKSpinner
} from 'react-native-material-kit';


class ScrollViewP extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loadMoreEnabled: true
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fetching && newProps.fetching == false) {
      setTimeout(() => {
        this.setState({loadMoreEnabled: true});
      }, 1000)
    }
  }

  render () {
    let {children} = this.props;
    let renderSpinner = this._renderSpinner.bind(this);
    let handleScroll = this._handleScroll.bind(this);

    return <ScrollView onScroll={handleScroll}>
      {children}

      {renderSpinner()}
    </ScrollView>
  }

  _renderSpinner() {
    let {fetching} = this.props;

    if (fetching) {
      return <View style={styles.spinnerContainer}>
        <MKSpinner style={styles.spinner} />
      </View>
    }
  }

  _handleScroll ({nativeEvent}) {
    let {fetching, fireDistance} = this.props;

    if (this.state.loadMoreEnabled && fetching == false) {
      let posY = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
      let height = nativeEvent.contentSize.height;

      if ((height - posY) <= fireDistance) {
        if (this.props.onLoadMore) {
          return this.props.onLoadMore();
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    padding: 12,
    alignItems: 'center'
  },

  spinner: {
    width: 30,
    height: 30
  }
});

ScrollViewP.defaultProps = {
  fetching: false,
  fireDistance: 100
}

export default ScrollViewP;
