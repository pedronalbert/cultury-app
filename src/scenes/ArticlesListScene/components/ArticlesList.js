/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  MKSpinner
} from 'react-native-material-kit';

/* Components */
import ArticleCard from './ArticleCard';
import ScrollView from '../../../components/ScrollView';

class ArticlesList extends Component {
  render () {
    let { articles, fetching } = this.props;
    let handleLoadMore = this._handleLoadMore.bind(this);

    return <ScrollView 
      fetching={fetching}
      onLoadMore={handleLoadMore} 
    >
      {articles.map(article => {
        return <ArticleCard key={article.id} article={article} />
      })}
    </ScrollView>
  }

  _handleLoadMore () {
    if (this.props.onLoadMore) {
      return this.props.onLoadMore();
    }
  }
}

const styles = StyleSheet.create({
  root: {
  }
});

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesList;
