/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import {
  MKSpinner,
  MKButton,
  MKColor
} from 'react-native-material-kit';
import _ from 'lodash';


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
    let renderErrorMessage = this._renderErrorMessage.bind(this);

    return <ScrollView onScroll={handleScroll}>
      {children}

      {renderSpinner()}
      {renderErrorMessage()}
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

  _renderErrorMessage () {
    let {errorMessage} = this.props;
    let handlePressRetryButton = this._handlePressRetryButton.bind(this);

    if (errorMessage) {
      return <View style={styles.errorCointainer}>
        <Text>{errorMessage}</Text>
        <MKButton style={styles.retryButton} onPress={handlePressRetryButton}>
          <Text style={styles.retryButtonText}>REINTENTAR</Text>
        </MKButton>
      </View>
    }
  }

  _handleScroll ({nativeEvent}) {
    let {fetching, fireDistance, errorMessage} = this.props;
    let {loadMoreEnabled} = this.state;

    if (loadMoreEnabled && fetching == false && _.isEmpty(errorMessage)) {
      let posY = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
      let height = nativeEvent.contentSize.height;

      if ((height - posY) <= fireDistance) {
        if (this.props.onLoadMore) {
          return this.props.onLoadMore();
        }
      }
    }
  }

  _handlePressRetryButton () {
    if (this.props.onPressRetryButton) {
      return this.props.onPressRetryButton();
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
  },

  errorCointainer: {
    padding: 12,
    alignItems: 'center'
  },

  retryButton: {
    height: 36,
    marginTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    justifyContent: 'center'
  },

  retryButtonText: {
    color: MKColor.Blue,
    fontWeight: 'bold'
  }
});

ScrollViewP.defaultProps = {
  fetching: false,
  fireDistance: 100
}

export default ScrollViewP;
