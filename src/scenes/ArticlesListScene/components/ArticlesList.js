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
  }

  render () {
    let { articles, fetching, errorMessage } = this.props;

    return <ScrollView
      fetching={fetching}
      errorMessage={errorMessage}
      onEndReached={this.props.onLoadMore}
      onPressRetryButton={this.props.onPressRetryButton}
    >
      {articles.map(article => {
        return <ArticleCard key={article.id} article={article} />
      })}
    </ScrollView>
  }
}

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onPressRetryButton: PropTypes.func.isRequired
};

export default ArticlesList;
