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
import {createStyles} from '../../../utils/mq.js';


class ArticleCard extends Component {
  render () {
    let {article} = this.props;
    let {title, imageUrl, content} = article.attributes;
    let handleOnLayout = this._handleOnLayout.bind(this);

    return <View 
      style={styles.root}
      onLayout={handleOnLayout}
    >
      <View style={styles.header}>
        <Image source={{uri: imageUrl}} style={styles.image}/>

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

  _handleOnLayout() {
  }
}

const baseStyles = {
  root: {
    backgroundColor: 'white',
    margin: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },

  image: {
    height: 130
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
  },

  '@media (max-width:600)': {
    title: {
      color: 'red'
    }
  }
};

const styles = createStyles(baseStyles);


ArticleCard.propTypes = {
  article: PropTypes.object.isRequired
}

export default ArticleCard;
