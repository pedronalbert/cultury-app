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
      endReached: false
    };

  }

  render () {
    let {children} = this.props;
    let renderSpinner = this._renderSpinner.bind(this);
    let handleScroll = this._handleScroll.bind(this);
    let handleContenSizeChange = this._handleContenSizeChange.bind(this);
    let renderError = this._renderError.bind(this);

    return <ScrollView
      onScroll={handleScroll}
      onContentSizeChange={handleContenSizeChange}
    >
      {children}

      {renderSpinner()}
      {renderError()}
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

  _renderError () {
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
    let { endReached } = this.state;
    let { endReachedDistance } = this.props;

    if ( endReached == false ) {
      let posY = nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height;
      let height = nativeEvent.contentSize.height;

      if ((height - posY) <= endReachedDistance) {
        this.setState({
          endReached: true
        });

        if (this.props.onEndReached) {
          return this.props.onEndReached();
        }
      }
    }
  }

  _handlePressRetryButton () {
    if (this.props.onPressRetryButton) {
      return this.props.onPressRetryButton();
    }
  }

  _handleContenSizeChange () {
    let { errorMessage, fetching } = this.props;

    if (_.isEmpty(errorMessage) && fetching == false) {
      this.setState({
        endReached: false
      });
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
  endReachedDistance: 1000
};

ScrollViewP.propTypes = {
  fetching: PropTypes.bool,
  onPressRetryButton: PropTypes.func,
  onEndReached: PropTypes.func,
  endReachedDistance: PropTypes.number,
  errorMessage: PropTypes.string
};

export default ScrollViewP;
