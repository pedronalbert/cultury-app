/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';

/* Components */
import ArticleCard from './ArticleCard';
import ScrollView from '../../../components/ScrollView';

class ArticlesList extends Component {
  constructor (props) {
    super(props);
    
    this._handleEndReached = this._handleEndReached.bind(this);
    this._handleOnPressRetryButton = this._handleOnPressRetryButton.bind(this);
  }

  render () {
    let { articles, fetching, errorMessage } = this.props;

    return <ScrollView
      fetching={fetching}
      errorMessage={errorMessage}
      onEndReached={this._handleEndReached}
      onPressRetryButton={this._handleOnPressRetryButton}
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

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func,
  onPressRetryButton: PropTypes.func
};

export default ArticlesList;
