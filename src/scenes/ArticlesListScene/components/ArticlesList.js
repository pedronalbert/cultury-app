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
    let handleOnPressRetryButton = this._handleOnPressRetryButton.bind(this);

    return <ScrollView
      fetching={fetching}
      errorMessage={errorMessage}
      onEndReached={handleEndReached}
      onPressRetryButton={handleOnPressRetryButton}
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

  _handleOnPressRetryButton () {
    if (this.props.onPressRetryButton) {
      return this.props.onPressRetryButton();
    }
  }
}

const styles = StyleSheet.create({
  root: {
  }
});

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func,
  onPressRetryButton: PropTypes.func
};

export default ArticlesList;
