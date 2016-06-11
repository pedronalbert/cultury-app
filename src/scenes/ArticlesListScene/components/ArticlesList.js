/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  ListView
} from 'react-native';

/* Components */
import ArticleCard from './ArticleCard';
import ScrollView from '../../../components/ScrollView';

class ArticlesList extends Component {

  render () {
    let { articles, fetching, errorMessage } = this.props;
    let handleEndReached = this._handleEndReached.bind(this);

    return <ScrollView
      fetching={fetching}
      errorMessage={errorMessage}
      onEndReached={handleEndReached}
    >
      {articles.map(article => {
        return <ArticleCard key={article.id} article={article} />
      })}
    </ScrollView>
  }

  _handleEndReached () {
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
  articles: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func
};

export default ArticlesList;
