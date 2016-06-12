/* Dependencies */
import React, { 
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import _ from 'lodash';

/* Components */

class ArticleCard extends Component {
  constructor (props) {
    super(props);

    this._handleLayout = this._handleLayout.bind(this);

    this.state = {
      imageHeight: 100
    }
  }

  render () {
    let {title, imageUrl, content} = this.props.article.attributes;

    return <View style={styles.root}>
      <View ref='header' style={styles.header} onLayout={this._handleLayout}>
        <Image source={{uri: imageUrl}} style={{height: this.state.imageHeight}}/>

        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{_.capitalize(title)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={5}>
          {content}
        </Text>
      </View>
    </View>
  }

  _handleLayout (event) {
    this.refs.header.measure((a, b, width, height, px, py) => {
      if (width) {
        this.setState({
          imageHeight: width * 0.40
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    margin: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },

  titleRow: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingLeft: 16,
    paddingRight: 16,
    height: 40,
    marginTop: -40,
    justifyContent: 'center'
  },

  content: {
    backgroundColor: 'white',
    padding: 14
  }
});


ArticleCard.propTypes = {
  article: PropTypes.shape({
    attributes: {
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }
  }).isRequired
}

export default ArticleCard;
